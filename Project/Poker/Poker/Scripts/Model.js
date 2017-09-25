var model = {
    cardTextures: [],
    chipTextures: [],
    playerCards: new Array(),
    tableCards: new Array(),
    playerChips: new Array(),
    tableChips: new Array(),
    playerMoney: new Array(),
    playerMoneyAmount: new Array(),
    playerChipAmount: new Array(),
    playerStakes: new Array(),
    avatars: new Array(),
    tableChipAmount: 0,
    noShownCards: 0,
    camera: 0,
    sounds: new Array(),

    init: function ()
    {
        this.sounds["raise"] = new Audio("../Content/sounds/raise.mp3");
        this.sounds["fold"] = new Audio("../Content/sounds/fold.mp3");
        this.sounds["check"] = new Audio("../Content/sounds/check.mp3");
        this.sounds["flop"] = new Audio("../Content/sounds/flop.mp3");
        this.sounds["wait"] = new Audio("../Content/sounds/wait.mp3");
    },

    setAvatar: function (position, name)
    {
        if (this.avatars[position].material != 'undefined')
            this.avatars[position].material.dispose();
        this.avatars[position].material = new BABYLON.StandardMaterial(""+position+"avatar", scene);
        this.avatars[position].material.diffuseTexture = new BABYLON.Texture(name, scene);
        this.avatars[position].material.diffuseTexture.hasAlpha = true;
        this.avatars[position].material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        this.avatars[position].setEnabled(1);
    },
    removeAvatar: function (position)
    {
        var plane = avatars[position];
        plane.material.dispose();
        plane.setEnabled(0);
    },
    getCardTexture: function (cardName) {
        if (typeof this.cardTextures[cardName] === 'undefined') {
            var newCard = new BABYLON.StandardMaterial(cardName, scene);
            newCard.alpha = 1;
            newCard.diffuseColor = new BABYLON.Color3(1, 1, 1);
            newCard.backFaceCulling = false;
            newCard.diffuseTexture = new BABYLON.Texture("../Scripts/textures/" + cardName + ".png", scene);

            this.cardTextures[cardName] = newCard;
        }

        return this.cardTextures[cardName];
    },
    changePlayerChipAmount: function (playerNumber, amount)
    {
        this.setPlayerChips(playerNumber, amount + this.playerChipAmount[playerNumber]);
    },
    getChipTexture: function (amount) {
        if (typeof this.chipTextures[amount] === 'undefined') {
            var newChip = new BABYLON.StandardMaterial(amount, scene);
            newChip.alpha = 1;
            newChip.diffuseColor = new BABYLON.Color3(1, 1, 1);
            newChip.backFaceCulling = false;
            newChip.diffuseTexture = new BABYLON.Texture("../Scripts/textures/" + amount + ".png", scene);

            this.chipTextures[amount] = newChip;
        }

        return this.chipTextures[amount];
    },
    setPlayerCards: function(playerNumber, card1, card2)
    {
        this.playerCards[playerNumber][0].setEnabled(1);
        this.playerCards[playerNumber][0].material = this.getCardTexture(card1);
        this.playerCards[playerNumber][1].setEnabled(1);
        this.playerCards[playerNumber][1].material = this.getCardTexture(card2);
    },
    setTableCard: function (position, card)
    {
        this.tableCards[position].setEnabled(1);
        this.tableCards[position].material = this.getCardTexture(card);
    },
    //to do
    setPlayerMoney: function (playerNumber, amount)
    {
        this.playerMoney[playerNumber] = amount;
    },
    setPlayerChips: function (playerNumber, amount)
    {
        var chips = this.findChipsForSum(amount, 20);
        this.playerChipAmount[playerNumber] = amount;
        for (var i = 0; i < 20; ++i)
        {
            if (typeof chips[i] === 'undefined')
            {
                this.playerChips[playerNumber][i][0].setEnabled(0);
                this.playerChips[playerNumber][i][1].setEnabled(0);
                this.playerChips[playerNumber][i][2].setEnabled(0);
            }
            else
            {
                this.playerChips[playerNumber][i][0].setEnabled(1);
                this.playerChips[playerNumber][i][1].setEnabled(1);
                this.playerChips[playerNumber][i][2].setEnabled(1);
                this.playerChips[playerNumber][i][0].material = this.getChipTexture("" + chips[i]);
                this.playerChips[playerNumber][i][1].material = this.getChipTexture("" + chips[i]);
                this.playerChips[playerNumber][i][2].material = this.getChipTexture("" + chips[i]);
            }
        }
        setStakes(playerNumber, amount);
    },
    setTableChips: function (amount)
    {
        var chips = this.findChipsForSum(amount, 20);
        this.tableChipAmount = amount;
        for (var i = 0; i < 20; ++i) {
            if (typeof chips[i] === 'undefined') {
                this.playerChips[8][i][0].setEnabled(0);
                this.playerChips[8][i][1].setEnabled(0);
                this.playerChips[8][i][2].setEnabled(0);
            }
            else {
                this.playerChips[8][i][0].setEnabled(1);
                this.playerChips[8][i][1].setEnabled(1);
                this.playerChips[8][i][2].setEnabled(1);
                this.playerChips[8][i][0].material = this.getChipTexture("" + chips[i]);
                this.playerChips[8][i][1].material = this.getChipTexture("" + chips[i]);
                this.playerChips[8][i][2].material = this.getChipTexture("" + chips[i]);
            }
        }
        setStakes(8, amount);
    },
    changeTableChips: function (amount)
    {
        this.setTableChips(this.tableChipAmount + amount);
    },
    resetSceen: function ()
    {
        this.noShownCards = 0;
        this.setTableChips(0);
        for (var i = 0; i < 8; ++i)
        {
            this.setPlayerChips(i,0);
            this.playerCards[i][0].setEnabled(0);
            this.playerCards[i][1].setEnabled(0);
        }
        for (var i = 0; i < 5; ++i)
            this.tableCards[i].setEnabled(0);
    },
    findChipsForSum : function (sum, limit) {
        var niz = [100, 500, 1000, 5000, 25000, 100000, 250000, 500000, 1000000];
        var values = [];
        var i = 0;
        var j = 8;
        var sumCopy = sum;

        while (sumCopy != 0 && i != limit && j >= 0) {
            if (sumCopy >= niz[j]) {
                sumCopy -= niz[j];
                values.push(niz[j]);
                i++;
            }
            else
                j--;
        }

        return values;
    },
    eliminatePlayer : function (position)
    {
        this.setPlayerChips(position, 0);
        this.playerCards[position][0].setEnabled(0);
        this.playerCards[position][1].setEnabled(0);
    }
}