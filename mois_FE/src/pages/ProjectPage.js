import Header from "../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {makeRequest} from "../utils/requests";
import DonationList from "../components/DonationList";

function ProjectPage() {
    const [data, setData] = useState(null)
    let { projectId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProject() {
            const response = await makeRequest(`/project/${projectId}/`)
            if (response.json_status === 401) {
                navigate("/login")
            } else {
                setData(response.data)
            }
        }
        fetchProject()

    }, [navigate, projectId])

    const renderedDonatables = data && data.donatables.map((donatable) => {
        const leftContent =
            <>
                <span>Sbírka: '{donatable.title}'</span>
            </>

        const rightContent =
            <>
                <span>Potřebujeme {donatable.demandedMoney} Kč</span>
                <span>Máme: {donatable.earnedMoney} Kč</span>
                <span>Zbývá: {donatable.demandedMoney - donatable.earnedMoney} Kč</span>
            </>

        return (
            <li key={donatable._id}>
                <div className="left">
                    { leftContent }
                </div>
                <div className="right">
                    { rightContent }
                </div>
            </li>
        )
    })

    const anyDonatables = data && data.donatables.length > 0
    const sumEarned = data && data.donatables.reduce((acc, donatable) => acc + donatable.earnedMoney, 0)
    const sumDemanded = data && data.donatables.reduce((acc, donatable) => acc + donatable.demandedMoney, 0)
    const content = data && (
         <>
             <h3>Sbírky projektu:</h3>
             <h3>'{data.project.title}'</h3>
             {data && anyDonatables && <h2>Celkově vybráno: {sumEarned} Kč</h2>}
             {data && anyDonatables && <h2>Celkově zbývá: {sumDemanded} Kč</h2>}
             { anyDonatables ? <ul id="donatables-list">{renderedDonatables}</ul> : <h4>Žádné nejsou</h4>}
             <h3>Největší dary:</h3>
             { anyDonatables ? <DonationList listId="gift-list" donations={data.biggest_donations} /> : <h4>Žádné nejsou</h4>}
         </>
    )

    return (
        <>
            <Header title="PROJEKTY"></Header>
            <main className="project">
                {data ? content : <h2>Data se stahují...</h2> }
            </main>
        </>
    )
}

export default ProjectPage;