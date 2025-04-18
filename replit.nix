{
  description = "A basic web development environment";
  
  deps = with nixpkgs; [
    nodejs-18_x
    nodePackages.typescript
    nodePackages.yarn
    nodePackages.pm2
  ];
}
