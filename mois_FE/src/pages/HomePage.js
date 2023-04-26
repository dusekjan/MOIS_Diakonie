import {useEffect, useState} from "react";
import Header from "../components/Header";
import { makeRequest } from "../utils/requests";
import {Link, useNavigate} from "react-router-dom";

function HomePage() {
    const [data, setData] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProjects() {
            const projects = await makeRequest("/projects/")
            if (projects.json_status === 401) {
                navigate("/login")
            } else {
                setData(projects.data)
            }
        }
        fetchProjects()

    }, [navigate])

    const renderedData = data && data.map((project) => {
        const leftContent =
            <>
                <span>Projekt: '{project.title}'</span>
            </>

        const rightContent =
            <>
                <Link to={`/project/${project._id}`}>DETAIL</Link>
            </>

        return (
            <li key={project._id}>
                <div className="left">
                    { leftContent }
                </div>
                <div className="right">
                    { rightContent }
                </div>
            </li>
        )
    })

    const content = renderedData && (
         <>
             <h3 style={{
                 textAlign: "left",
                 marginLeft: "8px",
             }}>Všechny projekty:</h3>
             <ul id="project-list">{renderedData}</ul>
         </>
    )

    return (
        <>
            <Header title="Domov"></Header>
            <main className="home">
                { content || <h2>Data se stahují...</h2>}
            </main>
        </>
    )
}

export default HomePage;