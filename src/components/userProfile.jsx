import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function user({ user }) {
    // const dispatch = useDispatch();
    // const { id } = useParams();

    return user.user_id ? (
        <div>
            <h1>{user.display_name}</h1>
            <p>{user.email}</p>
        </div>
    ) : (
        <div>
            <h1>No User Found!</h1>
        </div>
    );
}