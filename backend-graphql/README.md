# Node.JS + Typescript + GraphQL/Apollo Server

## Dev setup

`yarn add -D typescript sucrase`

`sucrase`: Does not do type checking.

`yarn add -D nodemon`

`yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

## Operations

```js
mutation {
  storeTeam (name: "Palmeiras", foundation: 1914, logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/1200px-Palmeiras_logo.svg.png") {
    name
  }
}

mutation {
  storeTeamPlayers (
    teamId: "604e1abb997b6621efa0d840",
    players:[
      {
        name: "Dudu",
        age: 28,
        position: "Middle field",
        photoUrl: "https://fmdataba.com/images/p/84325.png"
      },
      {
        name: "Rafael Veiga",
        age: 25,
        position: "Middle field",
        photoUrl: "https://fmdataba.com/images/p/64152.png"
      },
      {
        name: "Rony",
        age: 26,
        position: "Middle field",
        photoUrl: "https://fmdataba.com/images/p/64169.png"
      },      
    ]
  ) {
    name,
    team {
      name
    }
  }
}

query {
  findTeamPlayers(teamId: "604cbbdfaa9fe3283266cd76") {
    id,
    name,
    age
  }
}

query {
  findAllTeams {
    id,
    name,
    foundation,
    players {
      name,
      age,
      photoUrl,
      position
    }
  }
}

subscription {
  teamAdded {
    name
  }
}
```