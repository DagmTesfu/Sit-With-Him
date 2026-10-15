var CANON="Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|1 Samuel|2 Samuel|1 Kings|2 Kings|1 Chronicles|2 Chronicles|Ezra|Nehemiah|Esther|Job|Psalms|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews|James|1 Peter|2 Peter|1 John|2 John|3 John|Jude|Revelation".split("|");
var OSIS="Gen|Exod|Lev|Num|Deut|Josh|Judg|Ruth|1Sam|2Sam|1Kgs|2Kgs|1Chr|2Chr|Ezra|Neh|Esth|Job|Ps|Prov|Eccl|Song|Isa|Jer|Lam|Ezek|Dan|Hos|Joel|Amos|Obad|Jonah|Mic|Nah|Hab|Zeph|Hag|Zech|Mal|Matt|Mark|Luke|John|Acts|Rom|1Cor|2Cor|Gal|Eph|Phil|Col|1Thess|2Thess|1Tim|2Tim|Titus|Phlm|Heb|Jas|1Pet|2Pet|1John|2John|3John|Jude|Rev".split("|");
// Verse REFERENCES only. The text always comes from your Bible file.
// g = group, l = label, kw = extra search words, lead/pray = short lines, refs = verses (first one is the main passage)
var HD="Hard days",FW="Fear and worry",HL="Hurt and loss",GS="Guilt and shame",FG="Faith and God",GD="Good days";
var M={
sad:{g:HD,l:"Sad",kw:"depressed down crying",lead:"You can be sad in front of Him. He keeps account of every tear.",refs:"Psalms 30:5|Psalms 56:8|Psalms 126:5-6|John 16:20"},
overwhelmed:{g:HD,l:"Overwhelmed",kw:"too much stress",lead:"You don't have to carry all of it at once. Hand Him the next thing only.",refs:"Psalms 61:2|Isaiah 43:2|2 Corinthians 12:9|Matthew 11:28"},
hopeless:{g:HD,l:"Hopeless",kw:"despair give up",lead:"Hope is something He gives, even when you can't find it yourself.",refs:"Romans 15:13|Jeremiah 29:11|Psalms 130:5|Hebrews 6:19"},
numb:{g:HD,l:"Numb",kw:"nothing cold",lead:"Feeling nothing isn't failing. Ask Him to bring your heart back to life.",refs:"Ezekiel 36:26|Psalms 85:6|Psalms 119:25|Psalms 51:12"},
empty:{g:HD,l:"Empty",kw:"hollow",lead:"Come with the empty cup. He fills it.",refs:"John 4:14|Psalms 107:9|Isaiah 55:1-2|John 7:37-38"},
tired:{g:HD,l:"Tired",kw:"exhausted worn out",lead:"You're invited just as you are, with no performance needed.",pray:"Hand Him what's weighing on you, one thing at a time. Then just rest in His company.",refs:"Matthew 11:28-30|Isaiah 40:28-31|Psalms 23:1-3|Galatians 6:9"},
stressed:{g:HD,l:"Stressed or under pressure",kw:"work busy",lead:"Rest is something He gives. You don't have to earn it first.",refs:"Psalms 127:2|Psalms 55:22|Mark 6:31|Isaiah 26:3"},
weak:{g:HD,l:"Weak",kw:"strength",lead:"Your weakness is where His strength shows up.",refs:"2 Corinthians 12:9-10|Isaiah 40:29|Psalms 73:26|Philippians 4:13"},
sleep:{g:HD,l:"Can't sleep",kw:"night insomnia",lead:"Give Him the night. He doesn't sleep.",refs:"Psalms 4:8|Psalms 3:5|Proverbs 3:24|Psalms 121:3-4"},
pain:{g:HD,l:"In pain or sick",kw:"illness health body",lead:"Bring your body and your pain to Him, not only your thoughts.",refs:"Psalms 41:3|Isaiah 53:5|James 5:14-15|Psalms 103:2-3"},
angry:{g:HD,l:"Angry",kw:"mad furious rage",lead:"Tell Him the anger. Don't let it sit and settle in you.",refs:"Psalms 4:4|Proverbs 14:29|James 1:19-20|Ephesians 4:26-27"},
discouraged:{g:HD,l:"Discouraged",kw:"down",lead:"Pause before you decide what this means. Let Him speak first.",pray:"Tell Him what's discouraging you. Ask what He wants you to see.",refs:"Psalms 42:11|Lamentations 3:22-23|2 Corinthians 4:16-17|Romans 8:28"},
anxious:{g:FW,l:"Anxious",kw:"worried panic",lead:"Bring Him the thing that's loudest right now.",pray:"Name each worry out loud to Him. After each one, say: \"This is Yours.\"",refs:"Philippians 4:6-7|1 Peter 5:7|Matthew 6:33-34|Isaiah 26:3|Psalms 94:19"},
afraid:{g:FW,l:"Afraid",kw:"scared fear",lead:"Bring your fear to Him. You don't have to hide it.",pray:"Tell Him what you're afraid of, one thing at a time. Ask for His peace, not just an answer.",refs:"Isaiah 41:10|Psalms 56:3-4|Joshua 1:9|2 Timothy 1:7|Psalms 27:1"},
future:{g:FW,l:"Afraid of the future",kw:"tomorrow uncertain",lead:"Tomorrow is in His hands. Today is the part He's given you.",refs:"Psalms 31:15|Matthew 6:34|Isaiah 46:4|Romans 8:38-39"},
money:{g:FW,l:"Money worries",kw:"job bills debt provision",lead:"He knows what you need. Bring Him the numbers too.",refs:"Philippians 4:19|Matthew 6:31-33|Psalms 37:25|Proverbs 30:8-9"},
unsure:{g:FW,l:"Unsure what to do",kw:"confused decision direction",lead:"Ask Him for direction before you decide, then listen.",refs:"Proverbs 3:5-6|James 1:5|Psalms 32:8|Isaiah 30:21"},
courage:{g:FW,l:"Need courage",kw:"brave",lead:"Courage isn't having no fear. It's going with Him anyway.",refs:"Psalms 31:24|Joshua 1:9|1 Corinthians 16:13|Philippians 4:13"},
hurting:{g:HL,l:"Hurting",kw:"heartbroken pain",lead:"You don't have to hold it together here.",pray:"Tell Him what hurts. Sit with Him in it before you try to make sense of it.",refs:"Psalms 34:18|Psalms 147:3|Matthew 5:4|2 Corinthians 1:3-4|Revelation 21:4"},
lonely:{g:HL,l:"Lonely",kw:"alone",lead:"You're not alone, even when it feels that way.",pray:"Tell Him how lonely you feel. Ask Him to make His nearness real to you.",refs:"Deuteronomy 31:6|Psalms 68:6|Matthew 28:20|Psalms 25:16"},
grieving:{g:HL,l:"Grieving a loss",kw:"death died mourning",lead:"Jesus wept too. Take your time.",refs:"John 11:35|John 11:25-26|Psalms 116:15|1 Thessalonians 4:13-14|Psalms 23:4"},
rejected:{g:HL,l:"Rejected",kw:"abandoned left out",lead:"People can leave. He won't.",refs:"Psalms 27:10|Isaiah 49:15-16|John 6:37|Romans 8:38-39"},
betrayed:{g:HL,l:"Betrayed",kw:"hurt by someone friend",lead:"He knows exactly how this feels. Tell Him all of it.",refs:"Psalms 41:9|Psalms 55:12-14|Psalms 55:22|Genesis 50:20"},
unloved:{g:HL,l:"Unloved",kw:"nobody loves me",lead:"You are loved before you do anything.",refs:"Romans 5:8|Jeremiah 31:3|1 John 4:9-10|Zephaniah 3:17|Ephesians 3:17-19"},
unseen:{g:HL,l:"Unseen or unappreciated",kw:"overlooked ignored",lead:"He sees what nobody else does.",refs:"Genesis 16:13|Matthew 6:4|Hebrews 6:10|Psalms 139:1-3"},
worthless:{g:HL,l:"Worthless",kw:"not enough useless",lead:"Your value was decided by Him, not by how you feel today.",refs:"Psalms 139:14|Luke 12:6-7|1 John 3:1|Ephesians 2:10"},
ending:{g:HL,l:"Thinking of ending my life",kw:"suicide die kill myself",warn:true,lead:"You matter to Him, and the pain you're in is real.",pray:"Tell Him exactly how bad it is. Then tell a real person near you today.",refs:"Psalms 34:17-18|Psalms 116:3-4|1 Kings 19:4-6|Psalms 42:11"},
guilty:{g:GS,l:"Guilty",kw:"sin forgiveness",lead:"Confession isn't groveling. It's stepping into the light.",refs:"1 John 1:9|Psalms 32:5|Psalms 103:12|Romans 8:1|Isaiah 1:18"},
ashamed:{g:GS,l:"Ashamed",kw:"embarrassed",lead:"Shame tells you to hide. He says come.",refs:"Romans 10:11|Psalms 34:5|Isaiah 54:4|Romans 8:1"},
regretful:{g:GS,l:"Regretful",kw:"past mistakes",lead:"What's behind you doesn't get the last word.",refs:"Joel 2:25|Isaiah 43:18-19|Philippians 3:13-14|Psalms 103:10-12"},
failure:{g:GS,l:"Like a failure",kw:"messed up",lead:"Falling isn't the end of the story with Him.",refs:"Philippians 1:6|Psalms 37:23-24|Proverbs 24:16|Micah 7:8"},
dry:{g:FG,l:"Dry",kw:"chore going through the motions",lead:"Coming when it feels like a chore still counts. You don't have to fake anything with Him.",pray:"Tell Him exactly how this feels, including that it feels like a chore. Ask Him to make you hungry for Him again.",refs:"Psalms 42:1-2|Psalms 63:1|Jeremiah 29:13|James 4:8|Psalms 143:6"},
doubting:{g:FG,l:"Doubting",kw:"unbelief questions",lead:"Honest doubt brought to Him is still reaching toward Him.",pray:"Tell Him what you doubt, plainly. Ask Him to help your unbelief.",refs:"Mark 9:24|John 20:27-29|James 1:5-6|Proverbs 3:5-6"},
far:{g:FG,l:"Far from Him",kw:"distant backslidden",lead:"He hasn't moved. Turn toward Him and you'll find Him already there.",refs:"Psalms 139:7-10|Luke 15:20|James 4:8|Isaiah 59:1-2"},
unanswered:{g:FG,l:"Prayers unanswered",kw:"silent god",lead:"Waiting isn't being ignored. Tell Him how long it's felt.",refs:"Psalms 13:1-2|Psalms 13:5-6|Luke 18:1|Habakkuk 2:3"},
scattered:{g:FG,l:"Scattered",kw:"distracted can't focus",lead:"A busy mind is normal. Gently bring it back each time it wanders.",pray:"Say His name slowly. Each time your mind drifts, come back to it without scolding yourself.",refs:"Psalms 46:10|Luke 10:41-42|Isaiah 30:15|Psalms 131:1-2"},
waiting:{g:FG,l:"Waiting or impatient",kw:"patience",lead:"Waiting with Him is different from waiting alone.",refs:"Psalms 27:14|Psalms 37:7|Lamentations 3:25-26|Isaiah 40:31"},
hungry:{g:FG,l:"Hungry for more",kw:"closer",lead:"Take your time with this one. There's no rush.",pray:"Ask Him what it would look like to stay close to Him today, and listen before you say amen.",refs:"John 15:4-5|Psalms 27:4|Philippians 3:10|John 6:35"},
thankful:{g:GD,l:"Thankful",kw:"grateful",lead:"Good place to start. Let it turn toward Him.",pray:"Thank Him for three specific things from this week, and tell Him why each one mattered.",refs:"Psalms 103:1-2|Psalms 100:4-5|1 Thessalonians 5:18|Psalms 136:1"},
joyful:{g:GD,l:"Joyful",kw:"happy glad",lead:"Enjoy it with Him, and tell Him thank you.",refs:"Psalms 118:24|Nehemiah 8:10|Psalms 16:11|Philippians 4:4"},
hopeful:{g:GD,l:"Hopeful",kw:"expectant",lead:"Hold onto this. Hope in Him doesn't disappoint.",refs:"Psalms 71:14|Romans 12:12|Hebrews 10:23|Romans 5:5"},
worship:{g:GD,l:"Want to worship",kw:"praise",lead:"Let it all go toward Him.",refs:"Psalms 95:6-7|Psalms 63:3-4|Revelation 4:11|Psalms 150:6"}
};
var BD="Body and desires",HM="Heart and mind",WH="Words and honesty",FO="Faith and obedience",OT="Other";
var T={
lust:{g:BD,l:"Lust or pornography",kw:"sex sexual masturbation",refs:"1 Corinthians 6:18-20|Job 31:1|Matthew 5:28|2 Timothy 2:22|Galatians 5:16|Psalms 119:9-11|Genesis 39:12"},
gluttony:{g:BD,l:"Gluttony",kw:"food overeating",refs:"1 Corinthians 10:31|Proverbs 25:28|Proverbs 23:20-21|Galatians 5:22-23|Philippians 3:19|1 Corinthians 6:12"},
drunk:{g:BD,l:"Drunkenness",kw:"alcohol drinking",refs:"Ephesians 5:18|Proverbs 20:1|Romans 13:13-14|Galatians 5:16"},
addict:{g:BD,l:"Addiction or a habit that controls me",kw:"smoking drugs gaming phone",refs:"1 Corinthians 6:12|Romans 6:12-14|John 8:36|Galatians 5:1|2 Peter 2:19"},
laziness:{g:BD,l:"Laziness",kw:"procrastination sloth",refs:"Proverbs 6:6-11|Colossians 3:23|Proverbs 13:4|Ephesians 5:15-16"},
pride:{g:HM,l:"Pride",kw:"arrogance boasting",refs:"James 4:6|Proverbs 16:18|Philippians 2:3-4|1 Peter 5:5-6|Proverbs 11:2"},
greed:{g:HM,l:"Greed",kw:"money covet materialism",refs:"1 Timothy 6:9-10|Hebrews 13:5|Luke 12:15|Matthew 6:19-21|Ecclesiastes 5:10"},
envy:{g:HM,l:"Envy or jealousy",kw:"comparison",refs:"Proverbs 14:30|James 3:16|Galatians 5:26|Psalms 37:1|1 Corinthians 13:4"},
anger:{g:HM,l:"Anger",kw:"rage temper",refs:"Ephesians 4:26-27|James 1:19-20|Proverbs 15:1|Proverbs 29:11|Romans 12:19|Colossians 3:8"},
bitter:{g:HM,l:"Bitterness or unforgiveness",kw:"grudge",refs:"Hebrews 12:15|Ephesians 4:31-32|Colossians 3:13|Matthew 6:14-15"},
revenge:{g:HM,l:"Wanting revenge",kw:"payback",refs:"Romans 12:19-21|Proverbs 24:29|Matthew 5:44|Leviticus 19:18"},
hate:{g:HM,l:"Hatred",kw:"hate",refs:"1 John 4:20|1 John 2:9|Matthew 5:44|Proverbs 10:12"},
judging:{g:HM,l:"Judging others",kw:"critical hypocrite",refs:"Matthew 7:1-5|Romans 14:10|James 4:11-12|John 8:7"},
people:{g:HM,l:"Fear of man or people-pleasing",kw:"approval peer pressure",refs:"Proverbs 29:25|Galatians 1:10|John 12:42-43|Psalms 118:6"},
idol:{g:HM,l:"Putting something above God",kw:"idol priorities",refs:"Exodus 20:3|Matthew 6:24|1 John 5:21|Matthew 22:37-38"},
world:{g:HM,l:"Loving the world",kw:"worldly fitting in",refs:"1 John 2:15-17|Romans 12:2|James 4:4|Colossians 3:2"},
complain:{g:HM,l:"Complaining or ungratefulness",kw:"grumbling",refs:"Philippians 2:14-15|1 Thessalonians 5:18|Psalms 103:2|Philippians 4:11"},
lying:{g:WH,l:"Lying",kw:"dishonest",refs:"Ephesians 4:25|Proverbs 12:22|Colossians 3:9"},
gossip:{g:WH,l:"Gossip",kw:"slander talking about people",refs:"Proverbs 11:13|Proverbs 16:28|Ephesians 4:29|James 1:26"},
words:{g:WH,l:"Harsh or foul words",kw:"cursing swearing tongue",refs:"Ephesians 4:29|Proverbs 18:21|Colossians 4:6|James 3:9-10"},
steal:{g:WH,l:"Stealing or cheating",kw:"theft dishonesty",refs:"Ephesians 4:28|Exodus 20:15|Proverbs 10:2|Luke 16:10"},
rebel:{g:FO,l:"Not wanting to obey",kw:"rebellion stubborn",refs:"1 Samuel 15:22|John 14:15|Romans 13:1|Hebrews 13:17"},
quit:{g:FO,l:"Tempted to give up",kw:"quit tired of faith",refs:"Galatians 6:9|Hebrews 12:1-3|1 Corinthians 15:58|Revelation 2:10"},
other:{g:OT,l:"Something else",kw:"any temptation",refs:"1 Corinthians 10:13|James 4:7|Matthew 26:41|Hebrews 4:15-16|James 1:12"},
fell:{g:OT,l:"I already gave in",kw:"fell failed again relapse",refs:"1 John 1:9|Proverbs 24:16|Psalms 51:1-2|Psalms 51:10|Romans 8:1|Micah 7:8"}
};
[M,T].forEach(function(o){Object.keys(o).forEach(function(k){o[k].refs=o[k].refs.split("|")})});
// Bible files in your data folder. To add a translation: save its JSON file in data/ and add a line here.
var VERSIONS=[
{id:"kjv",name:"KJV",file:"data/kjv.json"},
{id:"web",name:"WEB",file:"data/web.json"},
{id:"asv",name:"ASV",file:"data/asv.json"}
];