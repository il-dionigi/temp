/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register('MMM-wordnik',{

	dictionary: {
		word: "",
		partOfSpeech: "",
		definition: "",
		origin: "",
		pronounce: "",
		translation: "",
		exampleText: "",
		exampleTitle: ""
	},
	
	partOfSpeechList: {
		noun: 'n.',
		adjective: 'adj.',
		verb: 'v.',
		adverb: 'adv.',
		interjection: 'intj.',
		pronoun: 'pron.',
		preposition: 'p.',
		abbreviation: 'abbr.',
		affix: 'aff.',
		article: 'a.',
		//auxiliary-verb: 'aux.v.',
		conjunction: 'conj.',
		//definite-article: '',
		//family-name: '',
		//given-name: '',
		idiom: 'idiom.',
		imperative: 'imp.',
		//noun-plural: 'n.',
		//noun-posessive: 'n.',
		//past-participle: 'pp.',
		//phrasal-prefix: '',
		//proper-noun: 'pn.',
		//proper-noun-plural: 'pn.',
		//proper-noun-posessive: 'pn.',
		suffix: 'suff.',
		//verb-intransitive: 'vi.',
		//verb-transitive: 'vt',
	},
	
	default: {
		api_key: "",
		other_language: "",
		show_example: "False"
	},
	
	start: function() {
		Log.log('Starting module: ' + this.name)
		
		this.fadeSpeed = 2000;
		
		this.loaded = false;
		this.sendSocketNotification('GET WORD', this.config.api_key + '|' + this.config.other_language + '|' + this.config.show_example);
		
		var self = this;
		setInterval(function() {
			self.updateWord();
		}, 12*60*60*1000);
	},
	
	updateWord: function() {
		this.sendSocketNotification('GET WORD', this.config.api_key + '|' + this.config.other_language + '|' + this.config.show_example);
	},
	
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		
		if (!this.loaded) {
			wrapper.innerHTML = "Loading word of the day...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		
		var leftWrap = document.createElement("div");
		var dictWrap = document.createElement("div");
		var rightWrap = document.createElement("div");
		var wordWrap = document.createElement("span");
		var translationWrap = document.createElement("div");
		var translationLanguageWrap = document.createElement("span");
		var pronounceWrap = document.createElement("span");
		var partOfSpeechWrap = document.createElement("span");
		var definitionWrap = document.createElement("div");
		var originWrap = document.createElement("div");
		var exampleWrap = document.createElement("div");
		var exampleTitleWrap = document.createElement("span");
		var exampleTextWrap = document.createElement("div");
		
		leftWrap.style.display = 'inline-block';
		dictWrap.style.display = 'inline-block';
		rightWrap.style.display = 'inline-block';
		/*
		leftWrap.style.border = '3px solid red';
		dictWrap.style.border = '3px solid orange';
		rightWrap.style.border = '3px solid green';
		wordWrap.style.border = '3px solid blue';
		pronounceWrap.style.border = '3px solid white';
		partOfSpeechWrap.style.border = '3px solid yellow';
		definitionWrap.style.border = '3px solid pink';
		originWrap.style.border = '3px solid purple';
		//*/
		dictWrap.style.textAlign = 'justify';
		dictWrap.style.maxWidth = '50%';
		
		//wordWrap.style.marginRight = '10px';
		//pronounceWrap.style.marginRight = '10px';
		
		dictWrap.className = "normal medium";
		wordWrap.className = "bright medium";
		translationLanguageWrap.className = "normal medium";
		translationWrap.className = "bright medium";
		//pronounceWrap.className = "normal small";
		originWrap.className = "dimmed small";
		exampleWrap.className = "bright small";
		exampleTextWrap.className = "normal medium";
		exampleTitleWrap.className = "dimmed small";
		
		wordWrap.style.fontWeight = 'bold';
		translationWrap.style.fontWeight = 'bold';
		exampleWrap.style.fontStyle = 'italic';
		exampleTextWrap.style.fontStyle = 'italic';
		partOfSpeechWrap.style.fontStyle = 'italic';
		translationWrap.style.fontStyle = "italic";
		
		wordWrap.innerHTML = this.dictionary.word;
		pronounceWrap.innerHTML = ": " + this.dictionary.pronounce.replace(/^\(/,"/").replace(/\)$/,"/") + " ";
		partOfSpeechWrap.innerHTML = this.partOfSpeechList[this.dictionary.partOfSpeech];
		definitionWrap.innerHTML = this.dictionary.definition.replace(/\.+$/, '') + ".";
		originWrap.innerHTML = "origin: " + this.dictionary.origin.replace(/\.+$/, '') + ".";
		dictWrap.appendChild(wordWrap);
		dictWrap.appendChild(pronounceWrap);
		dictWrap.appendChild(partOfSpeechWrap);
		// Only if some other language was chosen and the translation found
		if (this.config.other_language != "" && this.dictionary.translation != "")
		{
			translationWrap.innerHTML = this.dictionary.translation
			translationLanguageWrap.innerHTML = " in " + this.config.other_language
			translationWrap.appendChild(translationLanguageWrap);
			dictWrap.appendChild(translationWrap);
		}
		dictWrap.appendChild(definitionWrap);
		dictWrap.appendChild(originWrap);
		// Only if example requested and a valid example found
		if (this.config.show_example == 'True' && this.dictionary.exampleText != "")
		{
			if (this.dictionary.exampleTitle != "")
			{
				exampleTitleWrap.innerHTML = this.dictionary.exampleTitle
			}
			else
			{
				exampleTitleWrap.innerHTML = "Unknown Source " 				
			}
			exampleWrap.innerHTML = "Example from "
			exampleTextWrap.innerHTML = this.dictionary.exampleText
			exampleWrap.appendChild(exampleTitleWrap)
			dictWrap.appendChild(exampleWrap)
			dictWrap.appendChild(exampleTextWrap)
		}
		wrapper.appendChild(leftWrap);
		wrapper.appendChild(dictWrap);
		wrapper.appendChild(rightWrap);
		return wrapper;
	},
	
	socketNotificationReceived: function(notification, payload) {
		if (notification === "ERROR") {
			Log.log(payload.message)
		}
		if (notification !== "UPDATE") {
			this.dictionary[notification] = payload.message;
		}
		if (notification === "UPDATE") {
			Log.log('Updating Dom');
			this.loaded = true;
			this.updateDom(this.fadeSpeed);
		}
	},
});
