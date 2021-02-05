import React, { useState } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/user/register", {
            method: 'POST',
            body: JSON.stringify({user:{username: username, passwordhash: password}}),
            //changed password to passwordhash
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => response.json()
            ).then((data) => {
            props.updateToken(data.sessionToken);
            })
    }
        // }).then(response => response.text())
        // .then(text =>console.log(text))
    return ( 
        <div>
            <h1>Signup</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
                    {username === "" ? <p>username is required</p> : ""}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label><Input onChange={(e) => setPassword(e.target.value)}name="password" value={password}/>
                </FormGroup>
                <Button type="submit">Signup</Button>
            </Form>
        </div>
     );
}
 
export default Signup;