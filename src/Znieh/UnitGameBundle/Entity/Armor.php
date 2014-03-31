<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Armor
 *
 * @ORM\Table()
 * @ORM\Entity
 * @ExclusionPolicy("all")
 */
class Armor
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User", inversedBy="armors")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $helm;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $torso;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $gloves;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $greaves;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $boots;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\VillageGameBundle\Entity\ArmorType")
     * @ORM\JoinColumn(nullable=false)
     * @Expose
     */
    private $type;

    public function guessType() 
    {
        return "Lourd";
    }

    public function getPoints()
    {
        return $this->helm->getPoints() + $this->torso->getPoints() + $this->gloves->getPoints() + $this->greaves->getPoints() + $this->boots->getPoints();
    }

    public function getEffects()
    {
        $effects = array();
        foreach ($this->helm->getEffects() as $key => $value) {
            if (!array_key_exists($key, $effects)) {
                $effects[$key] = $value;
            } else {
                $effects[$key] += $value;
            }
        }
        foreach ($this->torso->getEffects() as $key => $value) {
            if (!array_key_exists($key, $effects)) {
                $effects[$key] = $value;
            } else {
                $effects[$key] += $value;
            }
        }
        foreach ($this->gloves->getEffects() as $key => $value) {
            if (!array_key_exists($key, $effects)) {
                $effects[$key] = $value;
            } else {
                $effects[$key] += $value;
            }
        }
        foreach ($this->greaves->getEffects() as $key => $value) {
            if (!array_key_exists($key, $effects)) {
                $effects[$key] = $value;
            } else {
                $effects[$key] += $value;
            }
        }
        foreach ($this->boots->getEffects() as $key => $value) {
            if (!array_key_exists($key, $effects)) {
                $effects[$key] = $value;
            } else {
                $effects[$key] += $value;
            }
        }
        return $effects;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->pieces = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     *
     * @return Armor
     */
    public function setUser(\Znieh\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Znieh\UserBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set type
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorType $type
     *
     * @return Armor
     */
    public function setType(\Znieh\VillageGameBundle\Entity\ArmorType $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\VillageGameBundle\Entity\ArmorType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set helm
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $helm
     *
     * @return Armor
     */
    public function setHelm(\Znieh\UnitGameBundle\Entity\ArmorPiece $helm = null)
    {
        $this->helm = $helm;

        return $this;
    }

    /**
     * Get helm
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getHelm()
    {
        return $this->helm;
    }

    /**
     * Set torso
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $torso
     *
     * @return Armor
     */
    public function setTorso(\Znieh\UnitGameBundle\Entity\ArmorPiece $torso = null)
    {
        $this->torso = $torso;

        return $this;
    }

    /**
     * Get torso
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getTorso()
    {
        return $this->torso;
    }

    /**
     * Set gloves
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $gloves
     *
     * @return Armor
     */
    public function setGloves(\Znieh\UnitGameBundle\Entity\ArmorPiece $gloves = null)
    {
        $this->gloves = $gloves;

        return $this;
    }

    /**
     * Get gloves
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getGloves()
    {
        return $this->gloves;
    }

    /**
     * Set greaves
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $greaves
     *
     * @return Armor
     */
    public function setGreaves(\Znieh\UnitGameBundle\Entity\ArmorPiece $greaves = null)
    {
        $this->greaves = $greaves;

        return $this;
    }

    /**
     * Get greaves
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getGreaves()
    {
        return $this->greaves;
    }

    /**
     * Set boots
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $boots
     *
     * @return Armor
     */
    public function setBoots(\Znieh\UnitGameBundle\Entity\ArmorPiece $boots = null)
    {
        $this->boots = $boots;

        return $this;
    }

    /**
     * Get boots
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getBoots()
    {
        return $this->boots;
    }
}
