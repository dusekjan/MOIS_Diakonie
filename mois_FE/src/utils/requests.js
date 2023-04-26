
export async function makeRequest(url, data, method) {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        url = "http://localhost:5000" + url
    }

    let opts = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    }
    if (data){
        opts.body = JSON.stringify(data)
        opts.method = method || "POST"
    }

    try {
        let response = await fetch(url, opts)
        const json = await response.json()

        if (json.json_status >= 400 && json.json_status !== 401) {
            console.log("Errors", json.message)
        }

        return json
    } catch (e) {
        console.log("ERROR: ", e)
        throw new Error(e)
    }
}
