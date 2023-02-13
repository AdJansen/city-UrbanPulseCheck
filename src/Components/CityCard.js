import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import React from 'react';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useState } from 'react';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => { //ExapandMore was taken from MUI
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

//Card component taken from material-ui with some modifications to work with our data
//CityCard will probably need to intake data from the API, and then display it in the card
const CityCard = ({ urbanDetail, urbanScore }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    console.log(urbanScore ? urbanScore.score_out_of_10 : null)
    return (

        <Card >

            <CardHeader
                title={urbanDetail.label}
                subheader= {urbanScore ? "Teleport Score Out of 10: "+urbanScore.score_out_of_10 : null}
            />


            <CardActions disableSpacing>
                <ExpandMore
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
                    {urbanDetail.data.map((data) => (
                        // <Typography key={data.label} variant="body2" color="text.secondary" style={{textAlign}}>
                        //     {data.label} :{data.string_value}{data.float_value}{data.int_value}{data.currency_dollar_value}{data.percent_value}
                        // </Typography>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ textAlign: "left" }}>{data.label} :</div>
                            <div style={{ textAlign: "right" }}>
                                {data.string_value ? data.string_value : null}
                                {data.float_value ? data.float_value : null}
                                {data.int_value ? data.int_value : null}
                                {data.currency_dollar_value ? data.currency_dollar_value : null}
                                {data.percent_value ? data.percent_value * 100 : null}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Collapse>
        </Card>

    )
}

export default CityCard;