import { createContext } from "react";
import type ContextDataContent from "../interfaces/context.interface";

const Context = createContext<ContextDataContent | undefined>(undefined);

export default Context;
