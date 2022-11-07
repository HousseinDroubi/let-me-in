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

    public $code,$username;

    public function __construct(){

        $this->code=$code;
        $this->username=$username;
    }

    public function envelope(){

        return new Envelope(
            subject: 'Reset Password',
        );
    }

    public function content(){

        return new Content(
            markdown: 'emails.codes',
        );
    }

    public function attachments(){

        return [];
    }

    public function build(){

        return $this->subject('Reset Password')
        ->markdown('emails.acknowledgements');
    }
}
