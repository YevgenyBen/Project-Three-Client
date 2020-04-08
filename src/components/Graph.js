import React, { useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Container from '@material-ui/core/Container';
import { useSelector } from "react-redux";
import { ResponsiveBar } from '@nivo/bar'

function Graph({ data }) {
    { console.log(data) }
    return (
        < ResponsiveBar
            data={data}
            keys={['Favorited']}
            indexBy="destination"
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }
            }
            padding={0.3}
            colors={{ scheme: 'pastel2' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Destination',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Favorite',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            groupMode="grouped"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )
}

export default withRouter(Graph)