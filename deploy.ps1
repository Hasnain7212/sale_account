# Git commands
git add .
git commit -m "Update: $args"
git push

# Install dependencies
npm install

# Run type check and build
npm run build

# Deploy to Vercel
vercel deploy --prod
