export const fetchData = async () => {
    try {
        const token =
            "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWZhdWx0QGFkbWluIiwiaWF0IjoxNjg3MTI0ODEzLCJleHAiOjE2ODcxMjU1MzN9.6ahbqRdlGqNYiqj2E9zZXZlMPgcP0pQDDBXSzJ1Pr6Q"; // Replace 'your_jwt_token' with your actual JWT token
        const response = await fetch(
            "http://localhost:8080/services/service-requests-with-user-name",
            {
             //headers: {
                //    Authorization: `Bearer ${token}`
               // }
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};
export async function handleDelete(id) {
    if (window.confirm(`Delete ${id}?`)) {
        try {
            const response = await fetch(`http://localhost:8080/services/service/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(response.statusMessage);
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
}
export  const handleSave = async (username, phoneNumber, description, status, price, selectedPost) => {
    // setStatus("PENDING"); // ????
    try {
        const response = await fetch(`http://localhost:8080/services/service/${selectedPost.id}/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: username,
                phoneNumber: phoneNumber,
                description: description,
                status: status,
                price: price,
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json(); // Parse the response body as JSON

            throw new Error(errorResponse.message); // Throw an Error with the message field from the response
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        window.alert(error.message);
    }
};




const ApiCalls = () => {
    return null;
};

export default ApiCalls;
