#!/usr/bin/env node
import sns = require('@aws-cdk/aws-sns');
import sqs = require('@aws-cdk/aws-sqs');
import cdk = require('@aws-cdk/cdk');

class CloudformationStack extends cdk.Stack {
    constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
        super(parent, name, props);

        const queue = new sqs.Queue(this, 'CloudformationQueue', {
            visibilityTimeoutSec: 300
        });

        const topic = new sns.Topic(this, 'CloudformationTopic');

        topic.subscribeQueue(queue);
    }
}

const app = new cdk.App(process.argv);

new CloudformationStack(app, 'CloudformationStack');

process.stdout.write(app.run());