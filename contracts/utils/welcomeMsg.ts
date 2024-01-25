function welcomeMsg() {
  console.log(`####### ####### #     #     #####                                          
   #    #     # ##    #    #     # #####   ##   #####  ##### ###### #####  
   #    #     # # #   #    #         #    #  #  #    #   #   #      #    # 
   #    #     # #  #  #     #####    #   #    # #    #   #   #####  #    # 
   #    #     # #   # #          #   #   ###### #####    #   #      #####  
   #    #     # #    ##    #     #   #   #    # #   #    #   #      #   #  
   #    ####### #     #     #####    #   #    # #    #   #   ###### #    # 
                                                                           `);
  const styleBox = `
  font-family: 'Arial', sans-serif;
  padding: 10px;
  border: 2px solid red;
  background: #fff;
`;

  const styleTitle = `
  font-weight: bold;
`;

  const styleLink = `
  color: blue;
  text-decoration: underline;
`;

  console.log(
    `┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                        │
│   TONStarter sdk 1.0.1 started                                                                         │
│   245 ms for manager and 3.9 s for preview                                                             │
│                                                                                                        │
│   A new version (1.0.5) is available!                                                                  │
│   Upgrade now: %c npx tonstarter-sdk@latest upgrade %c                                                 │
│                                                                                                        │
│   Read full changelog: %c https://github.com/tokamak-network/TONStarter-sdk/blob/next/CHANGELOG.md %c  │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘`
  );
}

export default welcomeMsg;
