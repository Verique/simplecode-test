import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EmployeeEditableData } from "../../interfaces/Employee";
import { TableViewParams } from "../../interfaces/TableViewParams";
import getUrl from "../../urlHelper";

export const fetchEmployees = createAsyncThunk(
    "employees",
    async (viewParams: TableViewParams) => {
        const url = getUrl(`/employee/page/${viewParams.page}`)
        const response = await axios.get(url, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") ?? "" },
            params: { descending: viewParams.descending, orderby: viewParams.orderby }
        });
        return response.data;
    }
)

export const deleteEmployee = createAsyncThunk(
    "employee/delete",
    async (id: number) => {
        const url = getUrl(`/employee/${id}`)
        const response = await axios.delete(url, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") ?? "" },
        });
        return response.data;
    }
)

export const addNewEmployee = createAsyncThunk(
    "employee/new",
    async (employee: EmployeeEditableData) => {
        const url = getUrl(`/employee/new`)
        const response = await axios.post(url,
            { ...employee },
            {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") ?? "" }
            });
        return response.data;
    }
)


