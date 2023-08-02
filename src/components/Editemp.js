// Editemp.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AddEmp.css";

const Editemp = () => {
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobno, setMobno] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");
        const name = queryParams.get("name");
        const email = queryParams.get("email");
        const mobno = queryParams.get("mobno");

        // Fetch the employee data using the id (e.g., using fetch) and update the state using useState
        // For this example, we won't implement the fetch functionality, just update the state with the values from the URL query parameters.
        setId(id);
        setName(name);
        setEmail(email);
        setMobno(mobno);
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            id,
            name,
            email,
            mobno,
        };

        try {
            // Fetch the existing data from the JSON file
            const response = await fetch("http://localhost:8000/employees");
            const data = await response.json();

            // Update the employee data in the existing data
            const updatedEmployeeData = data.map((user) =>
                user.id === id ? updatedData : user
            );

            // Save the updated data back to the JSON file
            await fetch("http://localhost:8000/employees", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployeeData),
            });

            alert("Employee edited successfully !");
            navigate("/listtable");
        } catch (error) {
            console.error("Error editing employee:", error);
        }
    };

    return (
        <div>
            <div className="login">
                <h5>Edit Employee Details</h5>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                type="text"
                                required
                                placeholder="Employee ID"
                                className="text"
                            />
                        </div>
                        <div>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text"
                                type="text"
                                required
                                placeholder="Employee Name"
                            />
                        </div>
                        <div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text"
                                type="email"
                                required
                                placeholder="Employee Email"
                            />
                        </div>
                        <div>
                            <input
                                value={mobno}
                                onChange={(e) => setMobno(e.target.value)}
                                className="text"
                                type="tel"
                                required
                                placeholder="Employee Mobile No."
                            />
                        </div>
                        <button className="btn-a">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editemp;
