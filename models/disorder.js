const db = require("../config/db");

const Disorder = {
  create: (disorderData, callback) => {
    const { disorder_name, description, treatment_plan } = disorderData;

    // Insert into `disorders` table
    const disorderQuery =
      "INSERT INTO disorders (disorder_name, description) VALUES (?, ?)";
    db.query(disorderQuery, [disorder_name, description], (err, result) => {
      if (err) return callback(err);

      const disorderId = result.insertId;

      // Insert into `treatmentPlans` if treatment_plan exists
      if (treatment_plan && treatment_plan.length > 0) {
        const treatmentQuery =
          "INSERT INTO treatmentPlans (disorder_id, plan_name, medications) VALUES ?";
        const treatmentValues = treatment_plan.map((plan) => [
          disorderId,
          plan.plan_name,
          plan.medications.join(","),
        ]);

        db.query(treatmentQuery, [treatmentValues], (err) => {
          if (err) return callback(err);
          callback(null, {
            message: "Disorder and treatment plans added successfully",
          });
        });
      } else {
        callback(null, { message: "Disorder added successfully" });
      }
    });
  },

  getAll: (callback) => {
    const query = `
        SELECT d.disorder_id, d.disorder_name, d.description, d.created_at,
               JSON_ARRAYAGG(
                   JSON_OBJECT('plan_name', t.plan_name, 'medications', t.medications)
               ) AS treatment_plans
        FROM disorders d
        LEFT JOIN treatmentPlans t ON d.disorder_id = t.disorder_id
        GROUP BY d.disorder_id
    `;

    db.query(query, (err, results) => {
      if (err) return callback(err);

      // Check and parse treatment_plans only if it's a string
      results.forEach((disorder) => {
        if (typeof disorder.treatment_plans === "string") {
          disorder.treatment_plans = JSON.parse(
            disorder.treatment_plans || "[]"
          );
        }
      });

      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = `
        SELECT d.disorder_id, d.disorder_name, d.description, d.created_at,
               JSON_ARRAYAGG(
                   JSON_OBJECT('plan_name', t.plan_name, 'medications', t.medications)
               ) AS treatment_plans
        FROM disorders d
        LEFT JOIN treatmentPlans t ON d.disorder_id = t.disorder_id
        WHERE d.disorder_id = ?
        GROUP BY d.disorder_id
    `;

    db.query(query, [id], (err, results) => {
      // Log error if there's an issue
      if (err) {
        return callback(err);
      }

      // Check if results are empty (no data found)
      if (results.length === 0) {
        return callback({ message: "Disorder not found" });
      }

      // Log the first result to verify the structure
      const disorder = results[0];

      // Check if treatment_plans is a string and parse it if necessary
      if (Array.isArray(disorder.treatment_plans)) {
        disorder.treatment_plans = disorder.treatment_plans.map((plan) => {
          return {
            plan_name: plan.plan_name,
            medications: plan.medications,
          };
        });
      } else {
        try {
          disorder.treatment_plans = JSON.parse(
            disorder.treatment_plans || "[]"
          );
        } catch (parseError) {
          disorder.treatment_plans = []; // Default to empty array if parsing fails
        }
      }

      // Return the disorder data to the callback
      callback(null, disorder);
    });
  },

  update: (id, disorderData, callback) => {
    let updateFields = [];
    let values = [];

    Object.keys(disorderData).forEach((key) => {
      if (disorderData[key] !== undefined) {
        if (key === "treatment_plan") {
          updateFields.push(`${key} = ?`);
          values.push(JSON.stringify(disorderData[key])); // Convert to JSON if it's treatment_plan
        } else {
          updateFields.push(`${key} = ?`);
          values.push(disorderData[key]);
        }
      }
    });

    if (updateFields.length === 0) {
      return callback({ message: "No fields to update" });
    }

    values.push(id); // Add ID at the end for the WHERE condition
    const query = `UPDATE disorders SET ${updateFields.join(
      ", "
    )} WHERE disorder_id = ?`;

    db.query(query, values, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  delete: (id, callback) => {
    const query = "DELETE FROM disorders WHERE disorder_id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
};

module.exports = Disorder;
