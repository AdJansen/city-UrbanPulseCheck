import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => { //ExapandMore was taken from MUI
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    margin: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


//Card component taken from material-ui with some modifications to work with our data
//CityCard will probably need to intake data from the API, and then display it in the card
const CityCard = ({ urbanDetail, urbanScore, testid}) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (

        <Card style={{ backgroundColor: "f5f5f5", alignItems: 'center' }} data-testid="citycard-component">

            <CardHeader
                title={urbanDetail.label}
                subheaderTypographyProps={urbanScore ? { color: urbanScore.score_out_of_10 > 6.5 ? "Green" : urbanScore.score_out_of_10 < 4 && urbanScore.score_out_of_10 > 0 ? "Red" : "text.secondary" } : { color: "text.secondary" }}
                subheader={urbanScore ? urbanScore.score_out_of_10 > 0 ? `Teleport Score Out of 10: ${urbanScore.score_out_of_10.toFixed(2)}` : "Teleport Score Out of 10: N/A" : "Teleport Score Out of 10: N/A"}
            />


            <CardActions>
                <ExpandMore //ExpandMore is a component from MUI
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <b>{urbanDetail.label === "Cost of Living" ? "Price in USD$": null} </b>
                    {urbanDetail.data.map((data) => (
                        (data.label.includes("Teleport score")) ? //Includes is used to display teleport score out of 10
                            (<div style={{ display: "flex", justifyContent: "space-between" }}> 
                                <div style={{ textAlign: "left" }}>{data.label} :</div>
                                <div style={{ textAlign: "right" }}>
                                    <b>{data.string_value ? data.string_value : null}
                                        {data.float_value ? `${(Number(data.float_value)*10).toFixed(2)} / 10` : null}
                                        {data.int_value ? data.int_value : null}
                                        {data.currency_dollar_value ? data.currency_dollar_value : null}
                                        {data.percent_value ? `${(data.percent_value * 100).toFixed(2)}%` : null}</b>
                                </div>
                            </div>) :
                            (<div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ textAlign: "left" }}>{data.label} :</div>
                                <div style={{ textAlign: "right" }}>
                                    <b>{data.string_value ? data.string_value : null}
                                        {data.float_value ? Number(data.float_value).toFixed(2) : null}
                                        {data.int_value ? data.int_value : null}
                                        {data.currency_dollar_value ? data.currency_dollar_value : null}
                                        {data.percent_value ? `${(data.percent_value * 100).toFixed(2)}%` : null}</b>
                                </div>
                            </div>)

                    ))}
                </CardContent>
            </Collapse>
        </Card>

    )
}

export default CityCard;