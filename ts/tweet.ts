class Tweet {
  private text: string;
  time: Date;
  date: string;

  constructor(tweet_text: string, tweet_time: string) {
    this.text = tweet_text;
    this.time = new Date(tweet_time); //, "ddd MMM D HH:mm:ss Z YYYY"
    this.date = tweet_time;
  }

  //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
  get source(): string {
    if (
      this.text.includes("Just completed") ||
      this.text.includes("Just posted")
    ) {
      return "completed_event";
    }
    if (this.text.includes("Watch")) {
      return "live_event";
    }
    if (
      this.text.includes("just set a goal") ||
      this.text.includes("Achieved")
    ) {
      return "achievement";
    }
    return "miscellaneous";
    //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
    //return "unknown";
  }

  //returns a boolean, whether the text includes any content written by the person tweeting.
  get written(): boolean {
    //TODO: identify whether the tweet is written
    if (this.text.includes(" - ")) {
      return true;
    }
    return false;
  }
  get writtenText(): string {
    if (!this.written) {
      return "";
    }
    //TODO: parse the written text from the tweet
    return this.text.substring(
      this.text.indexOf(" - "),
      this.text.indexOf("https")
    );
  }
  get activityType(): string {
    if (this.source != "completed_event") {
      return "unknown";
    }
    //TODO: parse the activity type from the text of the tweet
    if (this.text.includes("ski")) {
      return "ski";
    } else if (this.text.includes("circuit workout")) {
      return "circuit";
    } else if (this.text.includes("run")) {
      return "run";
    } else if (this.text.includes("walk")) {
      return "walk";
    } else if (this.text.includes("mtn bike")) {
      return "mtn bike";
    } else if (this.text.includes("bike")) {
      return "bike";
    } else if (this.text.includes("hike")) {
      return "hike";
    } else if (this.text.includes("mi activity")) {
      return "activity";
    } else if (this.text.includes("km activity")) {
      return "activity";
    } else if (this.text.includes("swim")) {
      return "swim";
    } else if (this.text.includes("chair ride")) {
      return "chair riding";
    } else if (this.text.includes("yoga")) {
      return "yoga";
    } else if (this.text.includes("elliptical workout")) {
      return "elliptical";
    } else if (this.text.includes("MySports Freestyle")) {
      return "MySports";
    } else if (this.text.includes("nordic")) {
      return "nordic";
    } else if (this.text.includes("snowboard")) {
      return "snowboard";
    } else if (this.text.includes("skate")) {
      return "skate";
    } else {
      return "other activity";
    }
  }
  get distance(): number {
    if (this.source != "completed_event") {
      return 0;
    }
    //TODO: prase the distance from the text of the tweet
    var distance = 0;
    var temp_arr = "";
    if (this.text.includes("mi")) {
      //source https://stackoverflow.com/questions/21634918/extract-a-float-from-a-string-in-javascript
      temp_arr = this.text.match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)![0];
      distance = parseFloat(temp_arr);
      return distance;
    }
    if (this.text.includes("km")) {
      temp_arr = this.text.match(/-?(?:\d+(?:\.\d*)?|\.\d+)/)![0];
      var temp = parseFloat(temp_arr);
      distance = parseFloat((temp / 1.609).toFixed(2));
      return distance;
    }
    if (this.text.includes("in")) {
      distance = 0;
      return distance;
    }
    return 0;
  }

  get dayType(): string {
    if (this.date.includes("Sat ") || this.date.includes("Sun ")) {
      return "weekend";
    } else if (
      this.date.includes("Mon ") ||
      this.date.includes("Tue ") ||
      this.date.includes("Wed ") ||
      this.date.includes("Thu ") ||
      this.date.includes("Fri ")
    ) {
      return "weekday";
    }
    return "";
  }

  get day(): string {
    if (this.date.includes("Sat")) {
      return "Sat";
    } else if (this.date.includes("Sun")) {
      return "Sun";
    } else if (this.date.includes("Mon")) {
      return "Mon";
    } else if (this.date.includes("Tue")) {
      return "Tue";
    } else if (this.date.includes("Wed")) {
      return "Wed";
    } else if (this.date.includes("Thu")) {
      return "Thu";
    } else if (this.date.includes("Fri")) {
      return "Fri";
    }
    return "";
  }
  getHTMLTableRow(rowNumber: number): string {
    //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity

    //source https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex
    let http_address_array = "";
    let http_address = this.text.match(/(http|https|ftp):\/\/([^\s]+)/g);
    if (http_address != null) {
      http_address.forEach((element) => {
        http_address_array += element.toString();
      });
    }

    return http_address_array;
  }
}
