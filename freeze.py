from app import app, freezer  

freezer = freezer(app)

if __name__ == '__main__':
    freezer.freeze()
