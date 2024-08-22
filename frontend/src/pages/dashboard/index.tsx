import { Outlet } from 'react-router-dom';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';

export default function Dashboard() {
    const width = ["w-[20%]", "w-[80%]"];
    return (
        <div>
            <Header />
            <div className='flex items-stretch justify-start'>
                <div className={`${width[0]}`}>
                    <Sidebar sidebarWidth={width[0]} />
                </div>
                <div className={`${width[1]} p-4`}>
                    <Outlet />
                </div>
            </div>
        </div>

    );
}