import React, { useState } from "react";
import "./App.css";

const staff = [
  { name: "Dr. Aisha Al Mansoori", role: "Pharmacist in Charge", branch: "Dubai Mall", license: "PHA-20491", expiry: "2026-11-20", hours: 42, status: "Active" },
  { name: "Dr. Omar Hassan", role: "Pharmacist", branch: "Jumeirah", license: "PHA-19822", expiry: "2026-07-15", hours: 38, status: "Active" },
  { name: "Mariam Khalid", role: "Pharmacy Technician", branch: "Dubai Mall", license: "TEC-8831", expiry: "2026-06-28", hours: 40, status: "License Alert" },
  { name: "Sara Ahmed", role: "Cashier", branch: "Sharjah", license: "N/A", expiry: "N/A", hours: 36, status: "Active" },
  { name: "Dr. Khalid Nasser", role: "Pharmacist", branch: "Abu Dhabi", license: "PHA-30192", expiry: "2026-09-02", hours: 44, status: "Overtime Risk" },
  { name: "Fatima Saeed", role: "Pharmacy Technician", branch: "Jumeirah", license: "TEC-7712", expiry: "2027-01-18", hours: 35, status: "Active" },
  { name: "Dr. Layla Salem", role: "Pharmacist in Charge", branch: "Sharjah", license: "PHA-44218", expiry: "2026-08-10", hours: 40, status: "Active" },
];

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [message, setMessage] = useState("");

  function handleAction(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  }

  const menu = ["Dashboard", "Employees", "AI Roster", "Leave Requests", "Shift Swaps", "Compliance", "Branches"];

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>PharmaRoster AI</h1>
        <p>AI Workforce Intelligence</p>

        {menu.map((item) => (
          <button
            key={item}
            className={page === item ? "nav active" : "nav"}
            onClick={() => setPage(item)}
          >
            {item}
          </button>
        ))}
      </aside>

      <main className="main">
        {message && <div className="toast">{message}</div>}
        <h1>{page}</h1>

        {page === "Dashboard" && <Dashboard handleAction={handleAction} />}
        {page === "Employees" && <Employees />}
        {page === "AI Roster" && <AIRoster handleAction={handleAction} />}
        {page === "Leave Requests" && <LeaveRequests handleAction={handleAction} />}
        {page === "Shift Swaps" && <ShiftSwaps handleAction={handleAction} />}
        {page === "Compliance" && <Compliance handleAction={handleAction} />}
        {page === "Branches" && <Branches handleAction={handleAction} />}
      </main>
    </div>
  );
}

function Dashboard({ handleAction }) {
  return (
    <>
      <div className="hero">
        <div>
          <h2>AI Pharmacy Workforce Command Center</h2>
          <p>Predict shortages, detect compliance risks, and generate smarter pharmacy rosters.</p>
        </div>
        <button onClick={() => handleAction("AI generated a new optimized roster suggestion.")}>
          Generate AI Roster
        </button>
      </div>

      <div className="cards">
        <Card title="Total Staff" value="124" />
        <Card title="Coverage Score" value="92%" />
        <Card title="AI Risk Alerts" value="6" />
        <Card title="License Alerts" value="3" />
      </div>

      <div className="section">
        <h2>AI Insights</h2>
        <div className="ai-box">
          <p>⚡ Jumeirah branch is predicted to be understaffed on Tuesday night.</p>
          <p>⚡ Khalid Nasser may exceed weekly overtime limit.</p>
          <p>⚡ Mariam Khalid’s license renewal should be prioritized.</p>
          <p>⚡ Dubai Mall needs extra weekend support based on historical footfall.</p>
        </div>
      </div>
    </>
  );
}

function Employees() {
  return (
    <div className="section">
      <h2>Staff Database</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Role</th><th>Branch</th><th>License</th><th>Expiry</th><th>Hours</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.role}</td>
              <td>{s.branch}</td>
              <td>{s.license}</td>
              <td>{s.expiry}</td>
              <td>{s.hours}</td>
              <td><span className={s.status === "Active" ? "badge" : "badge warning"}>{s.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AIRoster({ handleAction }) {
  return (
    <div className="section">
      <h2>AI Weekly Roster</h2>
      <button onClick={() => handleAction("AI balanced shifts based on hours, PIC coverage, and branch demand.")}>
        Optimize Schedule
      </button>
      <button onClick={() => handleAction("AI detected 2 uncovered shifts and suggested replacements.")}>
        Find Coverage Gaps
      </button>

      <table>
        <thead>
          <tr><th>Day</th><th>Morning</th><th>Evening</th><th>Night</th><th>AI Status</th></tr>
        </thead>
        <tbody>
          <tr><td>Monday</td><td>Aisha + Mariam</td><td>Omar + Sara</td><td>Khalid</td><td>Optimized</td></tr>
          <tr><td>Tuesday</td><td>Layla + Fatima</td><td>Aisha + Sara</td><td>Needs Staff</td><td className="red">Risk</td></tr>
          <tr><td>Wednesday</td><td>Omar + Mariam</td><td>Khalid + Fatima</td><td>Covered</td><td>Good</td></tr>
          <tr><td>Thursday</td><td>Aisha + Sara</td><td>Layla + Omar</td><td>Covered</td><td>Good</td></tr>
          <tr><td>Friday</td><td>Khalid + Fatima</td><td>Aisha + Mariam</td><td>Needs Staff</td><td className="red">Risk</td></tr>
        </tbody>
      </table>
    </div>
  );
}

function LeaveRequests({ handleAction }) {
  return (
    <div className="section">
      <h2>Leave Requests</h2>
      <Request name="Omar Hassan" type="Annual Leave" date="18–22 June" handleAction={handleAction} />
      <Request name="Mariam Khalid" type="Sick Leave" date="12 June" handleAction={handleAction} />
      <Request name="Fatima Saeed" type="Study Leave" date="25 June" handleAction={handleAction} />
    </div>
  );
}

function Request({ name, type, date, handleAction }) {
  return (
    <div className="request">
      <p><b>{name}</b> — {type} — {date}</p>
      <button onClick={() => handleAction(`${name}'s request approved.`)}>Approve</button>
      <button onClick={() => handleAction(`${name}'s request rejected.`)}>Reject</button>
    </div>
  );
}

function ShiftSwaps({ handleAction }) {
  return (
    <div className="section">
      <h2>Shift Swap Requests</h2>
      <Request name="Sara Ahmed swap with Omar Hassan" type="Tuesday Evening" date="AI says: Safe swap" handleAction={handleAction} />
      <Request name="Khalid Nasser swap with Layla Salem" type="Friday Night" date="AI says: Overtime risk" handleAction={handleAction} />
    </div>
  );
}

function Compliance({ handleAction }) {
  return (
    <div className="section">
      <h2>AI Compliance Monitor</h2>
      <button onClick={() => handleAction("Compliance scan completed: 3 warnings found.")}>Run AI Compliance Scan</button>
      <ul className="ai-box">
        <li>1 branch missing Pharmacist in Charge coverage.</li>
        <li>3 licenses expiring within 90 days.</li>
        <li>2 night shifts uncovered.</li>
        <li>1 employee approaching overtime threshold.</li>
      </ul>
    </div>
  );
}

function Branches({ handleAction }) {
  return (
    <div className="section">
      <h2>Multi-Branch Intelligence</h2>
      <button onClick={() => handleAction("AI suggested moving one pharmacist to Jumeirah branch.")}>
        Suggest Staff Movement
      </button>

      <div className="branch-grid">
        <Branch name="TLC Dubai Mall" status="Good Coverage" score="96%" />
        <Branch name="TLC Jumeirah" status="Needs Support" score="71%" />
        <Branch name="TLC Sharjah" status="Good Coverage" score="93%" />
        <Branch name="TLC Abu Dhabi" status="Overtime Risk" score="78%" />
      </div>
    </div>
  );
}

function Branch({ name, status, score }) {
  return (
    <div className="branch-card">
      <h3>{name}</h3>
      <p>{status}</p>
      <h2>{score}</h2>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}