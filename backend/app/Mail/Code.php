<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Code extends Mailable{

    use Queueable, SerializesModels;

    // In this class, we need 'code' and 'username' in order to pass them to the 
    // code blade.
    public $code,$username;

    public function __construct($code,$username){

        $this->code=$code;
        $this->username=$username;
    }

    public function envelope(){

        //Subject of the gmail
        return new Envelope(
            subject: 'Reset Password',
        );
    }

    public function content(){

        // The form that must be sent to an email
        return new Content(
            markdown: 'emails.codes',
        );
    }

    public function attachments(){

        return [];
    }

    public function build(){

        return $this->subject('Reset Password')
        ->markdown('emails.codes');
    }
}
