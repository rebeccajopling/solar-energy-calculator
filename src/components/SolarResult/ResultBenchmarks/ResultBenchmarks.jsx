import "../SolarResult.css";

export default function ResultBenchmarks() {
  return (
    <div className="result-benchmarks">
      <h4>Result Benchmarks</h4>
      <h4>(kWh/year)</h4>

      <table>
        <tbody>
          <tr>
            <td style={{ textAlign: "left" }}>Excellent</td>
            <td style={{ textAlign: "right" }}>&ge; 4000</td>
          </tr>
          <tr>
            <td colSpan="2">
              <hr />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: "left" }}>Good</td>
            <td style={{ textAlign: "right" }}>3000 – 3999</td>
          </tr>
          <tr>
            <td colSpan="2">
              <hr />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: "left" }}>Average</td>
            <td style={{ textAlign: "right" }}>2000 – 2999</td>
          </tr>
          <tr>
            <td colSpan="2">
              <hr />
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: "left" }}>Poor</td>
            <td style={{ textAlign: "right" }}>&lt; 2000</td>
          </tr>
          <tr>
            <td colSpan="2">
              <hr />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
