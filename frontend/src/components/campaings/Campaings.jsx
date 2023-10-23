import React from 'react'
import "./campaings.css"
import CampaingsItem from './CampaingsItem';

const Campaings = () => {
    return (
        <section className="campaigns">
            <div className="container">
                <div className="campaigns-wrapper">
                    <CampaingsItem />
                    <CampaingsItem />
                </div>
                <div className="campaigns-wrapper">
                    <CampaingsItem />
                    <CampaingsItem />
                </div>
            </div>
        </section>
    )
}

export default Campaings