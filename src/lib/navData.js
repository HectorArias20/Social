import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import PostAddIcon from '@mui/icons-material/PostAdd';
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <ScheduleSendIcon/>,
        text: "TimeTables",
        link: "timetables"
    },
    {
        id: 2,
        icon: <PostAddIcon/>,
        text: "Posts",
        link: "posts"
    },
    {
        id: 3,
        icon: <SettingsIcon/>,
        text: "Settings",
        link: "settings"
    },
    {
        id: 4,
        icon: <LogoutIcon/>,
        text: "Sign out",
        link: "signout"
    }
]