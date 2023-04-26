import Header from "../components/Header";
import {useEffect, useState} from "react";
import {makeRequest} from "../utils/requests";
import {useNavigate} from "react-router-dom";
import DonationList from "../components/DonationList";
import Chart from "../components/Chart";
import {groupByDate} from "../utils/chart";

function DonationsPage() {
    const [data, setData] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDonations() {
            const response = await makeRequest(`/donations-api/`)
            if (response.json_status === 401) {
                navigate("/login")
            } else {
                setData(response.data)
            }
        }
        fetchDonations()

    }, [navigate])


    let preparedChartData = [];
    if (data) {
        let chartData = groupByDate(data.donations);

        for (let date in chartData) {
            let record = {
                createdAt: date,
                price: chartData[date].reduce((acc, donation) => acc + donation.price, 0)
            }
            preparedChartData.push(record)

        }

        preparedChartData = preparedChartData.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt)
        })
    }

    const content = () => {

        return (
            <>
                 <h3>Největší dary ze všech projektů:</h3>
                <DonationList listId="gift-list" donations={data.biggest_donations} />
            </>
        )
    }

    return (
        <>
            <Header title="DARY"></Header>
            <main className="donations">
                { data ? content() : <h2>Data se stahují...</h2>}
                { data && <Chart data={preparedChartData}/> }
            </main>
        </>
    )
}

export default DonationsPage;