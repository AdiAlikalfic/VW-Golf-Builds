import Input from "../components/ui/Input";
import "./Sidebar.css"

function Sidebar() {

    return (
        <div className="sidebar">
            <h4>Filters</h4>
            
            <Input type="text" placeholder="Search builds..." />

            <div className="model-list">
                <h4>Model</h4>
                <ul>
                    <li>
                        <input type="checkbox" /> <p>Golf Mk8</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>Golf Mk7</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>Golf Mk6</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>Golf Mk5</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>Golf Mk4</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>Golf Mk3</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>Golf Mk2</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>Golf Mk1</p>
                    </li>
                </ul>
            </div>
            <div className="year-list">
                <h4>Year</h4>
                <ul>
                    <li>
                        <input type="checkbox" /> <p>2020-2025</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>2015-2019</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>2009-2014</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>2003-2008</p>
                    </li>
                    <li>
                        <input type="checkbox" /> <p>1997-2002</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar