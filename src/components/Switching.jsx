import React, { useState } from "react";
import ContentWrap from "./ContentWrap";

function Switching({data, onTabChange}) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, ind) => {
        setLeft(ind * 100);
        setTimeout(() => {
            setSelectedTab(ind);
        }, 300);
        onTabChange(tab, ind);
    }

    return(
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, ind) => (
                    <span 
                        key={ind} 
                        className={`tabItem ${selectedTab === ind ? "active" : ""}`}
                        onClick={() => activeTab(tab, ind)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{left}} />
            </div>
        </div>
    )
}

export default Switching;