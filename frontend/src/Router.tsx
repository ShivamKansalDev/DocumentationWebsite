import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginBG from "./pages/login/index";
import Login from "./pages/login/login";

// dashboard
import Dashboard from "./pages/dashboard";
// import Introduction from "./pages/dashboard/intro";
import Page from "./pages/dashboard/page";
import data from "./data/contents";
import { Subheading, Topic } from "./types/components";


export default function ReactRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    {data.map((item:Topic) => {
                        // console.log(item.link,'item');
                        
                        return (
                            <Route path={item.link} key={item.type}>
                                {
                                    item.subheadings.map((subItem: Subheading) => { 

                        
                                        return (
                                            <Route path={subItem.subLink} element={<Page pageDetails={subItem} />} key={subItem.topic} />
                                        )
                                    })
                                }
                            </Route>
                        )
                    })}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}