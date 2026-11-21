// Each item is a different target word, subject, object or action. These evergreen
// cards give every player their own supply at every difficulty, even between events.
const shared = [
  ['word', 'say', 1, 'say “%”', 
    `vanakkam
    super
    semma
    namaskaram
    saree
    santosham
    kutty
    nischayathartham
    thali
    kolam
    veshti
    jasmine
    mandap
    pattu
    payasam
    nadaswaram
    sangeet
    filter coffee
    malli poo
    mangalsutra`],
  ['name', 'say', 1, 'name %', 
    `a Telugu actor
    a Tamil actor
    a wedding flower
    a percussion instrument
    a silk saree colour
    a Tamil greeting
    a Telugu greeting
    a dosa filling
    a dance style
    a wedding sweet
    a hill station
    a cricket team
    a South Indian film director
    a breakfast dish
    a Telugu singer
    a Tamil singer
    a wedding outfit
    a rice dish
    a mango variety
    a song with a number in its name`],
  ['reaction', 'say', 1, 'say “%”', 
    `one more photo
    wait for me
    nice pose
    come here
    this way
    save me a seat
    good morning
    all set
    let’s go
    where are you
    I’m ready
    hold on
    that’s the one
    I’ll be back
    your turn
    group photo
    well played
    nice one
    count me in
    see you there`],
  ['phrase', 'say', 2, 'say “%”', 
    `that was a plot twist
    this deserves a replay
    we need a group name
    that’s a lucky colour
    that’s going in the album
    we should start a band
    I could do this all night
    that’s my signature pose
    this feels like a movie
    I’ll take that as a compliment
    I know the hook step
    that’s a power move
    I picked the wrong shoes
    the groom owes me one
    that’s my wedding strategy
    we need an encore
    that’s an excellent question
    you have good taste
    I’ll remember this tomorrow
    this is my lucky spot`],
  ['pick', 'say', 2, 'tell you %', 
    `their favourite wedding song
    which colour they almost wore
    what they would name a pet
    their go-to karaoke song
    the first film they saw in a theatre
    which wedding photo they would frame
    what they wanted to be as a child
    which actor should play them
    their favourite Tamil or Telugu word
    what their first nickname was
    which tune they never skip
    which city feels like home
    their favourite thing about mornings
    which festival they look forward to most
    which song would play on their entrance
    which guest they would ask for fashion advice
    what they ordered at their first café visit
    which game they always win
    what colour they would paint a dance floor
    what one thing they packed at the last minute`],
  ['choice', 'say', 2, 'say whether they’d choose %', 
    `a sunrise or a midnight wedding
    a live band or a DJ
    silk or cotton
    a posed photo or a candid
    a moonlit courtyard or a rooftop
    a beach ceremony or a hill ceremony
    a power ballad or a dance number
    an old film song or a new one
    a marigold garland or a jasmine garland
    a grand entrance or a quiet one
    a dance solo or a duet
    front row or back row
    a comedy film or a thriller
    a polaroid or a photo booth
    a matching outfit or a surprise outfit
    an early start or a late finish
    a bus trip or a train trip
    a handwritten note or a voice note
    a dramatic speech or a silent film
    a paper invite or a video invite`],
  ['explain', 'say', 3, 'explain % in two sentences', 
    `how to tell a candid from a staged photo
    how they would start a new wedding tradition
    how to rescue an awkward silence
    why guests give blessings
    how to pick a dance partner
    how they recognise a song in the first few seconds
    what makes a wedding speech memorable
    why a colour feels festive to them
    how they know when a photo needs a retake
    what makes someone a good wedding host
    how to remember the names of new relatives
    how they choose what goes into a wedding album
    how they would teach someone a greeting
    why they remember their first school function
    how they would describe the venue to someone who missed it
    how to get a whole group to smile at once
    why a favourite movie scene still works
    how they would introduce the couple to a stranger
    how they would turn a road trip into a game
    how they choose an outfit for a special day`],
  ['pitch', 'say', 3, 'invent a name for % and tell you why it fits', 
    `a wedding dance troupe
    the couple’s imaginary band
    a movie about this reception
    a game for family reunions
    a group-chat for early risers
    a team of wedding photographers
    a dance move for shy dancers
    a club for people who never miss a group photo
    a game show hosted by the groom
    an album of candid wedding photos
    the newlyweds’ travel show
    a competition for dramatic entrances
    a club for late-night storytellers
    a sketchbook about this venue
    a dance playlist for the cousins
    a photo booth for an old cinema
    a mystery novel set at a wedding
    a song about the muhurtham
    a team of wedding planners
    a podcast about first impressions`],
  ['story', 'say', 3, 'tell you a true story about %', 
    `a wedding dance that went wrong
    getting lost on the way to a function
    a surprise that took months to plan
    an outfit they changed at the last minute
    a family photograph that never turned out right
    the first time they spoke on stage
    a friend who made them laugh at the wrong moment
    a trip that started before sunrise
    learning a song by ear
    an aunt or uncle with a catchphrase
    being late even though they started early
    an unexpected guest at a celebration
    forgetting their steps during a dance
    an old friend turning up unexpectedly
    a time someone mistook them for a relative
    the first joke they remember telling
    a friend making a grand entrance
    their first time wearing traditional clothes
    a gift that was hard to wrap
    a tradition they learned from an elder`],
  ['three', 'say', 4, 'name three % without pausing for more than a beat', 
    `Telugu films with one-word titles
    Tamil film songs from different decades
    dance moves they could teach right now
    ways to greet an elder
    fictional couples from Indian films
    songs that would work for a wedding entrance
    South Indian cities starting with the same letter
    words in Telugu or Tamil for family members
    reasons to redo a group photo
    things guests always say before a ceremony
    different ways they would describe a silk saree
    things their family never forgets to pack
    actors who could play the groom in a movie
    objects they could turn into a wedding prop
    songs they could identify from a whistle
    film characters with famous entrances
    wedding traditions they have seen in person
    things they would include in a wedding time capsule
    places within the venue to set up a photo booth
    objects a guest might carry in a cloth bag`],
  ['adlib', 'say', 4, 'make up and say % aloud', 
    `a two-line toast that rhymes
    a slogan for the groom’s side of the dance floor
    a mock film trailer about arriving late to a wedding
    an announcement calling everyone for an imaginary award
    a two-sentence story with the words silk, rain and wedding
    a short award speech for the best candid photo
    a dramatic welcome to an imaginary guest from the future
    a riddle about a garland
    a tiny speech celebrating the happiest person in the room
    a made-up translation of a dance move
    a five-word wedding slogan beginning with L
    a rhyming compliment about someone’s outfit
    a news headline about the reception
    a polite excuse for sneaking into a group photo
    an imaginary weather report for the dance floor
    a motto for guests who arrive first
    a line of commentary for a slow-motion wedding entrance
    a dramatic introduction for the nadaswaram player
    an invented proverb about group photos
    a movie title and tagline about this wedding`],
  ['constraint', 'say', 4, 'describe % in exactly five words', 
    `the couple’s first dance
    the bride’s entrance
    the energy in the room
    their favourite old family photo
    a perfect group pose
    their first impression of the groom
    the music at this wedding
    how they feel at sunrise
    their dream wedding venue
    what they see from their seat
    the smell of jasmine
    the person who would organise the best trip
    the groom’s signature expression
    the best moment so far
    the colour of the evening
    a wedding dance they would attempt
    what makes a good friend
    their first school performance
    a festival from their childhood
    the most memorable outfit they’ve seen today`],
  ['gesture', 'act', 1, '%', 
    `give you a high five
    give you a fist bump
    wave at you from across the room
    give you a double thumbs-up
    salute you
    clap twice in response to something you do
    wink back at you
    flash a peace sign
    make a tiny heart with their fingers
    put both palms together to greet you
    give you a slow nod
    raise an eyebrow back at you
    count to three on their fingers
    make a heart with both hands
    tap a rhythm once on their knee
    snap their fingers twice
    cross their fingers for good luck
    mirror your hand wave
    touch their elbows together
    tap their shoulder as a cue`],
  ['point', 'act', 1, 'point out % without speaking', 
    `the mandap
    where they came in
    the next free chair
    where the music is coming from
    someone in matching colours
    the best-lit spot in the room
    a garland they like
    where they would take a selfie
    a familiar face across the room
    the nearest clock
    the way back from the stage
    a nice detail on their outfit
    where they left their bag
    the closest doorway
    where they would wait for a friend
    a flower in the decor
    the spot where they took their last photo
    something that sparkles
    where they would sit for the ceremony
    a decoration they would keep`],
  ['simple', 'act', 1, '%', 
    `hold your phone for a moment
    offer you the seat next to them
    straighten their own sleeve after seeing you do it
    turn their chair to face you
    look over their shoulder when you do
    take one step back to make space
    switch which hand is holding their phone
    put their phone face down
    move a chair closer to yours
    hold a door open for you
    lift an empty glass to clink yours
    hand you an unopened napkin
    save a spot in line for a moment
    step to the side to give someone a view
    stand beside you for a picture
    hold the end of a ribbon for you
    pick up a dropped napkin
    show you a gesture for “quiet”
    turn to look in the direction you point
    hold a place in a seating row for someone`],
  ['photo', 'act', 2, 'take a photo of %', 
    `the two of you making peace signs
    your shoes next to theirs
    the venue through a doorway
    the flowers from below
    two shadows side by side
    you pointing at the mandap
    two people in matching colours
    you sitting as if you’re royalty
    a reflection of the lights
    the two of you looking the wrong way
    your hands making the same shape
    a close-up of the border on a saree or veshti
    someone looking over their shoulder
    an empty chair with a garland behind it
    you halfway through a wave
    the stage from their favourite seat
    three different colours in one outfit
    you holding your palms together
    their own shadow next to a wedding decoration
    something here that looks like a letter`],
  ['pose', 'act', 2, 'hold a pose like % for three seconds', 
    `a superhero landing without kneeling
    a film star on a red carpet
    a statue at the entrance of a palace
    a singer holding an invisible microphone
    a dancer caught mid-turn
    a cricket umpire calling six
    a photographer peeking through a viewfinder
    an actor peering around a corner
    a magician revealing a card
    a musician pretending to tune an instrument
    someone opening an imaginary wedding invite
    a guest finally finding their seat
    a painter deciding where to start
    a royal guard trying not to laugh
    someone admiring fireworks
    a musician ending a performance
    a guest fixing an invisible crown
    someone trying to catch a falling leaf
    a detective spotting a clue
    a conductor about to start the band`],
  ['handy', 'act', 2, '%', 
    `turn a napkin into a triangle
    carry a chair closer for you
    show you how they fold an invitation
    help you straighten a decorative ribbon
    put two napkins down as placemats
    fan themselves with a paper card for three seconds
    hold their arms up to make a photo frame
    make a pretend moustache with one finger
    write their initials in the air
    show you how to keep time with four finger taps
    place two shoes heel to heel for a photo
    demonstrate how they tuck a veshti, using an imaginary cloth
    draw their signature in the air with their elbow
    point to three matching colours in the room
    balance a folded napkin on a hand for three seconds
    mirror a three-gesture sequence you silently show them
    rearrange two empty cups to make a clear spot for a phone
    show you three poses in quick succession
    draw a circle in the air with their non-dominant hand
    make a flower shape with their fingers`],
  ['create', 'act', 3, 'draw % on paper or trace it clearly in the air', 
    `a four-petal kolam
    a small oil lamp
    a jasmine garland
    a peacock feather
    the pattern on a silk border
    a tiny mandap
    a coconut with a leaf above it
    a decorated wedding invitation
    a musician playing the nadaswaram
    a pair of wedding shoes
    a thumbs-up inside a heart
    a flower with six petals
    a mango-shaped paisley
    a three-tier wedding cake
    a bridge with a sunrise behind it
    a pair of dancing hands
    a garland hung across a doorway
    a simple banana leaf with veins
    a film camera on a tripod
    a little house with a ceremonial doorway`],
  ['act-out', 'act', 3, 'mime % until you guess it', 
    `tying a garland
    stepping onto a crowded dance floor
    wrapping a tall wedding gift
    catching a flower petal
    correcting a crooked photo frame
    fixing a drum strap
    pouring filter coffee
    chasing a loose wedding invitation
    threading a needle
    finding their seat in the dark
    rushing out with one shoe on
    moving an invisible heavy chair
    opening an overstuffed suitcase
    combing their hair in a mirror
    calling a lost friend without a phone
    catching an imaginary cricket ball
    welcoming a guest at the doorway
    finding a dropped earring
    holding a too-tall stack of plates
    trying to sneak into a photo`],
  ['make', 'act', 3, '%', 
    `fold a napkin into a fan
    make a standing triangle from a blank sheet
    lead you through four beats of a dance step
    make a repeating rhythm with their hands and have you echo it
    fold paper to make it look like an open invitation
    arrange three loose items from lightest to darkest
    make a pretend photo frame from two pieces of paper
    show you a dance move without using their feet
    invent a handshake and do it through once with you
    fold a napkin into something that can stand upright
    guide you into a pose using only hand signals
    make an arch with their arms for you to pose beside
    create a flower pattern using only fingers from both your hands
    demonstrate three dance hand gestures in sequence
    line up three safe, light objects smallest to largest
    cover their eyes and identify a friend by their clap
    use a phone torch to cast a hand shadow
    take two different photos from exactly the same spot
    make a little pattern from three paper petals or napkins
    pose with you in a photo using your elbows to make a shape`],
  ['group-photo', 'act', 4, 'get a group of at least three people together for a photo where %', 
    `everyone points in the same direction
    everyone is facing away from the camera
    everyone pretends to catch a falling petal
    everyone holds one palm up
    each person makes a different dance gesture
    the group forms the first letter of the groom’s name
    everyone pretends to listen to someone just outside the frame
    everyone shows a different number on their fingers
    the group stands in height order
    everyone looks at the flowers instead of the camera
    each person makes a different expression
    all their shadows touch
    everyone waves with their non-dominant hand
    everyone poses as a film character
    the group points to the same guest
    everyone makes a mirror image of the person next to them
    the tallest person pretends to be the shortest
    everyone makes a different shape with their hands
    everyone recreates a pose from a wedding photo
    they all pretend to hold up a very long garland`],
  ['lead-group', 'act', 4, 'get two friends to join them in %', 
    `a synchronised double clap and snap
    a four-beat Telugu or Tamil hook step
    forming a chain of peace signs
    tracing the same kolam in the air
    a silent countdown followed by a wave
    a three-person handshake
    mirroring a short dance in slow motion
    holding a statue pose until you count to five
    a group salute with all three starting together
    acting out an entire wedding entrance without speaking
    a round of miming a song title
    making three different hand shadows
    a game of passing an invisible coconut
    building a tiny arch from safe, light items
    lining up and passing a clap from one end to the other
    acting out a film scene with only gestures
    switching places twice without speaking for a photo
    making a human picture frame around a friend
    a slow-motion relay with a folded napkin
    taking turns doing the same dramatic bow`],
  ['sequence', 'act', 4, '%', 
    `get two people to copy their outfit pose without speaking
    direct three friends into a staggered line using hand signals only
    take matching photos of the same pose in two places
    teach two people the same three-gesture sequence and record them doing it together
    get a pair of friends to trade places and repeat the same photo
    find three objects that match their outfit and arrange them in a photo
    get three guests to tap a rhythm in turn without missing a beat
    take a group selfie using a reflection instead of the camera directly
    guide two friends who are back to back into matching arm shapes
    fold a paper boat and get someone else to launch it by sliding it across an empty table
    find a matching border detail on two outfits and get both people in one photo
    get two friends to draw different parts of one kolam and join the lines
    get three friends to build and strike a pose with an invisible prop
    teach a friend a four-move handshake and perform it from memory
    recreate a three-person photo with everyone in swapped positions
    get two friends to follow their slow-motion dance for a full eight-count
    arrange three friends in a triangle facing outwards for a photo
    get two friends to write the couple’s initials in the air together
    start and end a three-person dance pose with one silent signal
    get two friends to copy their silhouette against the same wall`],
];

const themed = [
  ['idc', 'say', 1, 'say “negative space”|name a font that would suit the wedding poster'],
  ['idc', 'say', 2, 'compare the mandap to a design movement|say which wedding detail deserves a close-up and why'],
  ['idc', 'say', 3, 'explain the visual hierarchy of the wedding stage in two sentences|give the wedding poster a new title and justify their type choice'],
  ['idc', 'say', 4, 'pitch a wayfinding symbol for the venue without using a location name|describe this wedding using three design terms and no colours'],
  ['idc', 'act', 1, 'trace a rectangle in the air to frame a photo|show you the direction they would light the stage from'],
  ['idc', 'act', 2, 'crop a photo on their phone to make a better composition|position you so a line in the venue leads toward you in a photo'],
  ['idc', 'act', 3, 'arrange three light objects into a colour gradient on an empty table|sketch a symbol for the wedding without using a heart'],
  ['idc', 'act', 4, 'direct three friends into a composition with clear foreground and background|get two friends to rebuild a scene from the wedding invite as a photo'],
  ['cousins', 'say', 1, 'say the name of a game you played as kids|name a favourite school-holiday memory'],
  ['cousins', 'say', 2, 'tell you which cousin would survive longest on a road trip without a map|give you the family nickname they’d choose for you'],
  ['cousins', 'say', 3, 'explain a wedding tradition as they remember learning it from an elder|tell you their favourite story about a family trip'],
  ['cousins', 'say', 4, 'say three things the family always does at weddings without saying “photo”|make up a two-line toast with a family in-joke'],
  ['cousins', 'act', 1, 'wave at a cousin they haven’t greeted yet|make the face they always made in family photos as a child'],
  ['cousins', 'act', 2, 'show you a childhood pose and let you copy it|show you a hand gesture from a game the cousins played growing up'],
  ['cousins', 'act', 3, 'fold a paper boat the way they did as kids|mime a family tradition until you recognise it'],
  ['cousins', 'act', 4, 'recreate an old family photo’s pose with two cousins|get three cousins to stand in birthday-month order for a photo'],
  ['wow', 'say', 1, 'say “Azeroth”|name a favourite WoW zone'],
  ['wow', 'say', 2, 'tell you which WoW profession suits the wedding photographer|give the wedding garland a rarity rating'],
  ['wow', 'say', 3, 'describe a wedding guest’s outfit as a WoW gear set in two sentences|invent a quest title for finding the best view of the mandap'],
  ['wow', 'say', 4, 'give a three-part raid briefing for organising the group wedding photo|pitch a wedding achievement with two funny unlock conditions'],
  ['wow', 'act', 1, 'give you a thumbs-up ready check|strike a WoW character-select pose for two seconds'],
  ['wow', 'act', 2, 'mime casting a WoW spell without saying what it is|show you an emote for entering a wedding like a raid boss'],
  ['wow', 'act', 3, 'sketch a WoW quest marker next to a kolam|act out a WoW mount animation for you to guess'],
  ['wow', 'act', 4, 'direct three people to pose as tank, healer and DPS for a photo|get two friends to perform a victory emote with them at the same time'],
];

const timed = [
  ['reception', 'say', 2, 'predict which song will get the most guests dancing'],
  ['reception', 'say', 4, 'give an imaginary live commentary for the couple’s entrance'],
  ['reception', 'act', 2, 'choose a spot away from the crowd and take a photo of the stage from there'],
  ['reception', 'act', 4, 'organise a three-person photo where everyone copies a pose from a film poster'],
  ['night', 'say', 2, 'tell you one thing they always do before calling it a night'],
  ['night', 'say', 4, 'tell a late-night story where each sentence starts with the next letter of their name'],
  ['night', 'act', 2, 'tap along to a song you hum without naming it'],
  ['night', 'act', 4, 'teach two friends the ending pose from a song you all danced to tonight'],
  ['muhurtham', 'say', 2, 'tell you the first thing they noticed when they arrived this morning'],
  ['muhurtham', 'say', 4, 'describe the morning using three words in Tamil or Telugu and explain their choices'],
  ['muhurtham', 'act', 2, 'point out three changes to the venue since the reception'],
  ['muhurtham', 'act', 4, 'take matching group photos with a sunrise pose and a sunset pose'],
];

export const uniqueMissions = [
  ...shared.flatMap(([prefix, kind, difficulty, template, items]) =>
    items.split('\n').map(item => item.trim()).map((item, index) => ({
      id: `deck-${prefix}-${index + 1}`, kind, difficulty, waves: ['any'],
      text: `Get someone to ${template.replace('%', item)}.`,
    }))),
  ...themed.flatMap(([gang, kind, difficulty, items]) =>
    items.split('|').map((item, index) => ({
      id: `deck-${gang}-${kind}-${difficulty}-${index + 1}`, kind, difficulty, waves: ['any'], gangs: [gang],
      text: `Get someone to ${item}.`,
    }))),
  ...timed.map(([wave, kind, difficulty, item]) => ({
    id: `deck-${wave}-${kind}-${difficulty}`, kind, difficulty, waves: [wave],
    text: `Get someone to ${item}.`,
  })),
];
