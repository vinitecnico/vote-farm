import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import dataMock from "./mock-data";
import "./style.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const VoteCard = () => {
  const startResult = (data) => {
    return {
      show: false,
      data,
      showButton: false,
      quant: 0,
      percentage: 0,
      totalVotes: 0,
    };
  };
  const [result, setResult] = useState(startResult(dataMock.data));
  const classes = useStyles();

  const handleVote = (index) => {
    result.data[index].totalVotes++;
    setResult({ ...result, data: result.data, showButton: true });
  };

  const handleResult = () => {
    const item = result.data.sort((a, b) => b.totalVotes - a.totalVotes)[0];
    const totalVotes = result.data.reduce((acc, obj) => {
      return acc + obj.totalVotes;
    }, 0);

    const percentage = ((item.totalVotes / totalVotes) * 100).toFixed(2);

    setResult({
      show: true,
      showButton: false,
      data: [item],
      quant: item.totalVotes,
      percentage,
      totalVotes,
    });
  };

  const handleBack = () => {
    const data = dataMock.data.map((x) => {
      return { ...x, totalVotes: 0 };
    });
    setResult(startResult(data));
  };

  return (
    <Container maxWidth="sm" m={1}>
      <Grid container spacing={3}>
        {result.show && (
          <>
            <Typography gutterBottom variant="h5" component="h2">
              ELIMINADO com {result.percentage}% - {result.quant} votos - total{" "}
              {result.totalVotes}
            </Typography>
            <Button color="primary" onClick={handleBack}>
              voltar
            </Button>
          </>
        )}
        {result.data.map(({ img, name, description }, index) => {
          return (
            <Grid item xs={12} sm={6} key={index}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={img}
                    title={name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {!result.show && (
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleVote(index)}
                    >
                      vote
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          {result.showButton && (
            <Button variant="contained" color="primary" onClick={handleResult}>
              Result
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default VoteCard;
