python freeze.py

cd build

git init

git remote add origin https://github.com/KinchMath/SPUR

git add .
git commit -m "Deploy static site"

git push -f origin main:gh-pages

cd ..