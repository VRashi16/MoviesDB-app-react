import { useState } from 'react';
import './tabs.css'

const Tabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, index) => {
        setLeft(index * 90);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    };

  return (
    <div className="tabs">
        <div className="tab-items">
            {data.map((tab, index) => (
                <span key={index} className={`tab-item ${ selectedTab === index ? "tab-active" : ""}`} onClick={() => activeTab(tab, index)}>
                    {tab}
                </span>
            ))}
            <span className="tab-bg" style={{ left }} />
        </div>
    </div>
  )
}

export default Tabs