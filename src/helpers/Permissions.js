import {roles} from "../config/UserConstants";

export default function hasAccess(role)
{
    return role === roles.MANAGER
}