import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';
import DefaultedMessage from '../UI/DefaultedMessage';
import LangRoutes from '../../lang/LangRoutes'
import PageRoutes from '../../routes/PageRoutes'

const HomeSecondaryItem = (props) => {
	const appTheme = useTheme();

	return (
		<div style={{display: 'flex'}} className="p-3">
			<Card
					variant="outlined"
					className='shadow'
					sx={{ minWidth: 275, flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
				<CardActionArea component={Link} to={props.destination}>
					<CardMedia
						component="img"
						height="120"
						image={props.image}
						alt={LangRoutes.getDefaultedMessage(props.title) + " | " + LangRoutes.getDefaultedMessage(props.subtitle)}
					/>
					<CardContent>
						<Typography variant="h5" component="div" gutterBottom>
							<DefaultedMessage id={props.title}/>
						</Typography>
						<Typography variant="body" color="text.secondary">
							<DefaultedMessage id={props.subtitle}/>
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button component={Link}
							to={props.destination}>
						{LangRoutes.getDefaultedMessage(props.buttonText).toUpperCase()}
					</Button>
					{props.buttonText==="home.secondary.subscribe.button" && (
						<Button component={Link}
								to={`../${PageRoutes.slug(PageRoutes.UNSUBSCRIBE)}`}>
							{"UN" + LangRoutes.getDefaultedMessage(props.buttonText).toUpperCase()}
						</Button>
					)}
				</CardActions>
			</Card>
		</div>
	)
};

export default HomeSecondaryItem;
