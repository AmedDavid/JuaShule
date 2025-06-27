import os
# external url
# os.environ['DATABASE_URL'] = 'postgresql://juashule_db_user:Fjis1XgLjN3vrx68CBDRSQXDJmxrmJgb@dpg-d1dvlnjipnbc73dounrg-a.oregon-postgres.render.com/juashule_db'

# internal url
os.environ['DATABASE_URL'] = 'postgresql://juashule_db_user:Fjis1XgLjN3vrx68CBDRSQXDJmxrmJgb@dpg-d1dvlnjipnbc73dounrg-a/juashule_db'
# local url
#os.environ['DATABASE_URL'] = 'postgresql://juashule_user:Mchafuziarts189@localhost:5432/juashule'
os.environ['JWT_SECRET_KEY'] = '5070a9eef46c97215a8c141e064b35128ded257eca6b12c16955967059a68e8a'

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(port=5555, debug=True)