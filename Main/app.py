from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pymongo
import pandas as pd

# flask setup
app = Flask(__name__)

# conn = "mongodb://localhost:27017"
# client = pymongo.MongoClient(conn)

# db = client.crime_db
# collection = db.violent_crime

# #bens weapons data gathering:
# df = pd.DataFrame(list(db.collection.find({})))
# all_weapons = df['weapon_desc'].unique()
# all_weapons

# auto_guns = [ 'UZI SEMIAUTOMATIC ASSAULT RIFLE','UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE',
#        'HECKLER & KOCH 91 SEMIAUTOMATIC ASSAULT RIFLE','MAC-10 SEMIAUTOMATIC ASSAULT WEAPON','HECKLER & KOCH 93 SEMIAUTOMATIC ASSAULT RIFLE','MAC-11 SEMIAUTOMATIC ASSAULT WEAPON','ASSAULT WEAPON/UZI/AK47/ETC','OTHER FIREARM','AUTOMATIC WEAPON/SUB-MACHINE GUN','SEMI-AUTOMATIC RIFLE','SEMI-AUTOMATIC PISTOL',]
# nonauto_guns = ['SAWED OFF RIFLE/SHOTGUN','RIFLE','UNKNOWN FIREARM', 'HAND GUN', 'SHOTGUN', 'REVOLVER']
# handheld = [ 
#            'RELIC FIREARM',
#        'ANTIQUE FIREARM','MARTIAL ARTS WEAPONS', 'BLACKJACK', 'BOW AND ARROW','STRAIGHT RAZOR', 'BOWIE KNIFE', 'CLEAVER', 'RAZOR BLADE',
#        'ICE PICK', 'BRASS KNUCKLES',
#        'STUN GUN','SWITCH BLADE', 'RAZOR','GLASS',
#        'AXE','BELT FLAILING INSTRUMENT/CHAIN','SCISSORS','TIRE IRON', 'TOY GUN',
#        'AIR PISTOL/REVOLVER/RIFLE/BB GUN','STARTER PISTOL/REVOLVER','KNIFE WITH BLADE OVER 6 INCHES IN LENGTH',
#         'MACHETE',
#         'BOTTLE', 'SYRINGE', 'DIRK/DAGGER',
#        'BOARD', 'SCREWDRIVER','CLUB/BAT', 'UNKNOWN TYPE CUTTING INSTRUMENT', 'SWORD','BLUNT INSTRUMENT','STICK', 'HAMMER', 'KNIFE WITH BLADE 6INCHES OR LESS','OTHER CUTTING INSTRUMENT','ROCK/THROWN OBJECT','PIPE/METAL PIPE','KITCHEN KNIFE','FOLDING KNIFE', 'UNKNOWN WEAPON/OTHER WEAPON','OTHER KNIFE','CONCRETE BLOCK/BRICK']
# explosive = [ 'BOMB THREAT','EXPLOXIVE DEVICE',]

# physical = ['PHYSICAL PRESENCE','STRONG-ARM (HANDS, FIST, FEET OR BODILY FORCE)','VERBAL THREAT','MACE/PEPPER SPRAY',]
# other = ['VEHICLE','DEMAND NOTE','SIMULATED GUN','FIRE','ROPE/LIGATURE','LIQUOR/DRUGS','FIXED OBJECT',
#        'CAUSTIC CHEMICAL/POISON','SCALDING LIQUID','DOG/ANIMAL (SIC ANIMAL ON)']

# weapon_categories = [auto_guns, nonauto_guns, handheld, physical, other, explosive]
# weapon_names = ['auto_guns',
#         'nonauto_guns',
#         'handheld',
#         'physical',
#         'other',
#         'explosive'
#         ]


# template rendering
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chloropleth")
def choro1():
    return render_template("2017_crime.html")

@app.route("/choropleth2")
def choro2():
    return render_template("crime_rate_change.html")

@app.route("/scatter1")
def scatter1():
    return render_template("index-DS.html")

@app.route("/zipcode")
def chart1(zipcode):
    # df = pd.DataFrame(list(db.collection.find({})))
    # zip_df = df[df['Zip Code']==90013]
    # weapons_dict = {
    #     "auto_guns":[],
    #     "nonauto_guns":[],
    #     "handheld":[],
    #     "physical":[],
    #     "other":[],
    #     "explosive":[]}
        
    # timeline = []
    # for i in range(1,13):
    #     month_crimes = zip_df[zip_df['Month']==i]
    #     month_total = len(month_crimes)
    #     timeline.append(month_total)
    #     #print(month_crimes)
    #     for i  in range(0,len(weapon_categories)):
    #         weapon_crimes = month_crimes[month_crimes['weapon_desc'].isin(weapon_categories[i])]
    #         weapons_dict[weapon_names[i]].append(len(weapon_crimes))
     
    return render_template("timelines.html", zipcode=zipcode)

@app.route("/<zipcode>/data")
def chart2(zipcode):
    zipcode = int(zipcode)
    #need more effecient way to query data
    df = pd.DataFrame(list(db.collection.find({})))
    zip_df = df[df['Zip Code']==zipcode]
    weapons_dict = {
        "auto_guns":[],
        "nonauto_guns":[],
        "handheld":[],
        "physical":[],
        "other":[],
        "explosive":[],
        "timeline":[]}
        
    for i in range(1,13):
        month_crimes = zip_df[zip_df['Month']==i]
        month_total = len(month_crimes)
        weapons_dict['timeline'].append(month_total)
        #print(month_crimes)
        for i  in range(0,len(weapon_categories)):
            weapon_crimes = month_crimes[month_crimes['weapon_desc'].isin(weapon_categories[i])]
            weapons_dict[weapon_names[i]].append(len(weapon_crimes))

    return jsonify(weapons_dict)

if __name__ == "__main__":
    app.run(debug=True, port=8000)