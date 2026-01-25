export default function SystemHealth() {
  const systems = [
    { name: "Database API", status: "Online" },
    { name: "Payroll Processor", status: "Standby" },
    { name: "Integration Hub", status: "Online" }
  ];

  return (
    <div className="card system-health">
      <h3>System Health</h3>

      <ul>
        {systems.map((sys, i) => (
          <li key={i}>
            <span>{sys.name}</span>
            <span
              className={
                sys.status === "Online" ? "status online" : "status standby"
              }
            >
              {sys.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
