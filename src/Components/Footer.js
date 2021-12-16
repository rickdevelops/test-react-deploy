import "../CSS/Footer.css";
import Grid from "@mui/material/Grid";

const Footer = () => {
  return (
    <div className="footer">
      <Grid container>
        <Grid item xs={12} textAlign="center">
          <h4>
            Made with <i className="fas fa-heart"></i> with a initiative from
            Footer
          </h4>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
