import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";


function ChairsPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    return null;
}

export default ChairsPage;
