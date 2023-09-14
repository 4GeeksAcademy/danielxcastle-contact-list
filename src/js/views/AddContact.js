import React, {useEffect, useState} from "react";
import {Link, useParams, useSearchParams, useNavigate} from "react-router-dom";
import {Contacts} from "./Contacts";

export const AddContact = () => {
    const [contact, setContact] = useState();
    const params = useParams();
	const navigate = useNavigate();
    useEffect(() => {
        if ("contactId" in params) {
            fetch(`https://playground.4geeks.com/apis/fake/contact/${
                params.contactId
            }`).then((response) => response.json()).then((body) => {
                setContact(body[0]);
            })

        }
    }, []);
    return (<div className="container">
        <div>
            <h1 className="text-center mt-5">
                {
                contact ?. id ? "Edit " : "Add a new "
            }
                contact</h1>
            <form>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" placeholder="Full Name"
                        value={
                            contact ?. full_name || ""
                        }
                        onChange={
                            (event) => {
                                setContact((previousContact) => {
                                    if (!previousContact) {
                                        return {full_name: event.target.value}
                                    }
                                    return {
                                        ...previousContact,
                                        full_name: event.target.value
                                    }
                                })
                            }
                        }/>
                </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email"
                    value={
                        contact ?. email || ""
                    }
                    onChange={
                        (event) => {
                            setContact((previousContact) => {
                                if (!previousContact) {
                                    return {email: event.target.value}
                                }
                                return {
                                    ...previousContact,
                                    email: event.target.value
                                }
                            })
                        }
                    }/>

            </div>
        <div className="form-group">
            <label>Phone</label>
            <input type="phone" className="form-control" placeholder="Enter phone"
                value={
                    contact ?. phone || ""
                }
                onChange={
                    (event) => {
                        setContact((previousContact) => {
                            if (!previousContact) {
                                return {phone: event.target.value}
                            }
                            return {
                                ...previousContact,
                                phone: event.target.value
                            }
                        })
                    }
                }/>
        </div>
    <div className="form-group">
        <label>Address</label>
        <input type="text" className="form-control" placeholder="Enter address"
            value={
                contact ?. address || ""
            }
            onChange={
                (event) => {
                    setContact((previousContact) => {
                        if (!previousContact) {
                            return {address: event.target.value}
                        }
                        return {
                            ...previousContact,
                            address: event.target.value
                        }
                    })
                }
            }/>
    </div>
<button type="button" className="btn btn-primary form-control"
    onClick={
        async () => {
            if ("contactId" in params) {
                const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${
                    params["contactId"]
                }`, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(contact)
                })
                const body = await response.json()
                if (response.ok) {
                    navigate("/contacts")
                }
            } else {
                const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
						...contact, 
						agenda_slug: "danielxcastle"
					})
                })
				const body = await response.json()
                if (response.ok) {
                    navigate(`/contacts`)
				}
				
            }
			
        }}> save </button>
					<Link className="mt-3 w-100 text-center" to="/">
 						or get back to contacts 
					</Link>
				</form > 
			</div>
        </div>

	);
};
