class SocialMedia {
    action;
    text;
    subject;
    url;

    constructor(action, text, subject, url) {
        this.action = action;
        this.text = text;
        this.subject = subject;
        this.url = url;

    }

    shareTextOnly() {
        switch (this.action) {
            case 'mail':
                let m_url = 'mailto:?body=' + this.text + '&subject=' + this.subject;
                window.open(m_url);
                break;
            case 'twitter':
                let t_url = 'http://twitter.com/share?text=' + this.text;
                window.open(t_url);
                break;
            case 'facebook':
                let f_url = 'https://facebook.com/sharer/sharer.php?quote=' + this.text;
                window.open(f_url);
                break;
            case 'linkedin':
                let l_url = 'https://www.linkedin.com/shareArticle?mini=true&title=' + this.subject + '&summary=' + this.text;
                window.open(l_url);
                break;
            case 'whatsapp':
                let w_url = 'whatsapp://send?text=' + this.text + "\n" + "\n" + this.subject + '';
                window.open(w_url);
                break;
        }
    }

    share() {
        switch (this.action) {
            case 'mail':
                let m_url = 'mailto:?body=' + this.subject + "\n\n"  + '&subject=' + this.text;
                window.open(m_url);
                break;
            case 'twitter':
                let t_url = 'http://twitter.com/share?text=' + this.subject ;
                window.open(t_url);
                break;
            case 'facebook':
                let f_url = 'https://facebook.com/sharer/sharer.php?u=' + this.subject ;
                window.open(f_url);
                break;
            case 'linkedin':
                let l_url = 'https://www.linkedin.com/shareArticle?mini=true&title=' + this.subject + '&summary=' + this.text;
                window.open(l_url);
                break;
            case 'whatsapp':
                let w_url = 'whatsapp://send?text=' + this.subject + " " + " " + this.text ;
                window.open(w_url);
                break;
        }
    }

}