
export class User {
    id          : string;
    name        : string;
    email       : string;
	image       : string;
    country     : string;
    mobile      : string;
    language    : Array<Object>;
    role        : string;
    zip         : number;
    fcm         : string;
    rating      : any;
    client      : Array<string>;
    cardInfo    : { number   : string,
                    cvc      : string,
                    expMonth : string,
                    expYear  : string};
	cleanerInfo : { gender    : string,
                    intro     : string,
                    services  : Array<Object>, 
                    locations : Array<string>
                  };
}
