import { useState } from "react";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter height and weight");
      return;
    }

    const heightInMeter = height / 100;
    const bmiValue = (
      weight /
      (heightInMeter * heightInMeter)
    ).toFixed(2);

    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setStatus("Underweight");
    } else if (bmiValue < 25) {
      setStatus("Normal Weight");
    } else if (bmiValue < 30) {
      setStatus("Overweight");
    } else {
      setStatus("Obese");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-body">

              <h2 className="text-center mb-4">
                BMI Calculator
              </h2>

              <div className="mb-3">
                <label>Height (cm)</label>

                <input
                  type="number"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label>Weight (kg)</label>

                <input
                  type="number"
                  className="form-control"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={calculateBMI}
              >
                Calculate BMI
              </button>

              {bmi && (
                <div className="alert alert-success mt-4 text-center">
                  <h4>Your BMI: {bmi}</h4>
                  <h5>{status}</h5>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BMICalculator;