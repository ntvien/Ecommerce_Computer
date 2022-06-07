import React from "react";
import {

    useLocation
} from "react-router-dom";
export default function NoMatch() {
    let location = useLocation();
    return (
        <div class="d-flex justify-content-center">
            <h3>
                Không tìm thấy <code>{location.pathname}</code>
            </h3>
        </div>
    );
}