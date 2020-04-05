import * as React from "react";

class HomeComponent extends React.Component {
  public render() {
    return (
      <div>
        <h2>Home Page</h2>
        <p>The Home Page is accessible by every signed in user.</p>
      </div>
    );
  }
}

export const Home = (HomeComponent);