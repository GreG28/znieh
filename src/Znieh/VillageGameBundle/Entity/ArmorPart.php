<?php

namespace Znieh\VillageGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;


/**
 * @ORM\Entity
 * @ExclusionPolicy("all")
 */
class ArmorPart extends GameObject
{
    /**
     * @ORM\ManyToOne(targetEntity="ArmorPartType", cascade={"persist"})
     */
    private $type;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Set type
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorPartType $type
     *
     * @return ArmorPart
     */
    public function setType(\Znieh\VillageGameBundle\Entity\ArmorPartType $type = null)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\VillageGameBundle\Entity\ArmorPartType
     */
    public function getType()
    {
        return $this->type;
    }
}
